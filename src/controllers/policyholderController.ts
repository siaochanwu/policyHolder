import { Request, Response } from "express";
import { Policyholder } from "../models/policyholderModel";

//create a new policyholder
export const createPolicyholder = async (req: Request, res: Response) => {
	console.log(req.body);
  const { idNumber, name, introducer_code } = req.body;

  try {
    // check if idNumber(身分證號) exists
    const idNumberExists = await Policyholder.findOne({
      where: {
        idNumber: idNumber,
      },
    });

    //if idNumber not exists, find the the last id, and add 1 to it
    if (!idNumberExists) {
      const lastId = (await Policyholder.findOne({ order: [["code","DESC"]], })) || { code: "0000000000" };
      // console.log("lastId", lastId);

      const newId = parseInt(lastId.code) + 1;

      const data = {
        code: newId.toString(),
        name: name,
        registration_date: new Date(),
        introducer_code: introducer_code,
        idNumber: idNumber,
      };
      const newPolicyholder = await Policyholder.create(data);

      // check if introducer_code exists
			if (introducer_code) {
				await updateTopParent(newPolicyholder, newPolicyholder, "direct");
			}

      return res.status(201).json(newPolicyholder);
    } else {
			return res.status(409).json({ message: "idNumber already exists" });
    }
  } catch (error) {
		return res.status(500).json(error);
  }
};

async function updateTopParent(introducer: Policyholder, newPolicyholder: Policyholder, relationship: "direct" | "indirect") {
  if (!introducer.introducer_code) return;

	try {
		// update the introducer's left_child_code or right_child_code
		const topParent = await Policyholder.findByPk(introducer.introducer_code);
	
		if (topParent) {
			if (!topParent.l) {
				topParent.l = [
					{
						code: newPolicyholder.code,
						name: newPolicyholder.name,
						registration_date: newPolicyholder.registration_date,
						introducer_code: newPolicyholder.introducer_code,
						relationship: relationship,
					},
				];
			} else if (!topParent.r) {
				topParent.r = [
					{
						code: newPolicyholder.code,
						name: newPolicyholder.name,
						registration_date: newPolicyholder.registration_date,
						introducer_code: newPolicyholder.introducer_code,
						relationship: relationship,
					},
				];
			} else {
				const leftLength = topParent.l.length;
				const rightLength = topParent.r.length;
	
				if (leftLength <= rightLength) {
					topParent.l = [
						...topParent.l,
						{
							code: newPolicyholder.code,
							name: newPolicyholder.name,
							registration_date: newPolicyholder.registration_date,
							introducer_code: newPolicyholder.introducer_code,
							relationship: relationship,
						},
					];
				} else {
					topParent.r = [
						...topParent.r,
						{
							code: newPolicyholder.code,
							name: newPolicyholder.name,
							registration_date: newPolicyholder.registration_date,
							introducer_code: newPolicyholder.introducer_code,
							relationship: relationship,
						}
					];
				}
			}
			await topParent.save();

			if (topParent.introducer_code) {
				await updateTopParent(topParent, newPolicyholder, 'indirect');
			}
		} else {
			return console.log("Top parent not found");
		}
	} catch (error) {
		return console.log(error);
	}
}

export const getPolicyholders = async (req: Request, res: Response) => {
  try {
    const policyholders = await Policyholder.findAll();
    return res.status(200).json(policyholders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPolicyholderById = async (req: Request, res: Response) => {
  const { code } = req.params;

	try {
		const policyholder = await Policyholder.findByPk(code);

		if (!policyholder) {
			return res.status(404).json({ message: "Policyholder not found" });
		}

		// get max depth of four levels of children
		return res.status(200).json({
			code: policyholder.code, 
			name: policyholder.name,
			registration_date: policyholder.registration_date,
			introducer_code: policyholder.introducer_code,
			l: policyholder.l.length > 8 ? policyholder.l.slice(0, 8) : policyholder.l,
			r: policyholder.r.length > 8 ? policyholder.r.slice(0, 8) : policyholder.r,
		})
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const getTopParent = async (req: Request, res: Response) => {
	const { code } = req.params;

	try {
		const policyholder = await Policyholder.findByPk(code);

		if (!policyholder) {
			return res.status(404).json({ message: "Policyholder not found" });
		}

		if (!policyholder.introducer_code) {
			return res.status(404).json({ message: "Policyholder has no top parent" });
		} else {
			const topParent = await Policyholder.findByPk(policyholder.introducer_code);

			if (topParent) {
				return res.status(200).json({
					code: topParent.code,
					name: topParent.name,
					registration_date: topParent.registration_date,
					introducer_code: topParent.introducer_code,
					l: topParent.l,
					r: topParent.r,
				});
			} else {
				return res.status(404).json({ message: "Top parent not found" });
			}
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};
