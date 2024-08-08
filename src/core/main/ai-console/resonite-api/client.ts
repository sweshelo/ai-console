import { createHash } from "crypto";

type Contacts = {
  id: string;
  contactUsername: string;
  contactStatus: "Accepted" | "Ignored" | "Blocked" | "Requested" | null;
  isAccepted: boolean;
  latestMessageTime: Date;
  isMigrated: boolean;
  isCounterpartMigrated: boolean;
  ownerId: string;
};
type UserContactsResponse = Array<Contacts>;

export const getContacts = async (): Promise<Array<Contacts["id"]>> => {
  const hash = createHash("sha256");
  console.log(process.env.RESONITE_HW_ID);
  hash.update(process.env.RESONITE_HW_ID as string);
  const uid = hash.digest("hex") as string;

  // Resonite API Token 要求
  const auth = await (
    await fetch(`https://api.resonite.com/userSessions`, {
      headers: {
        "Content-Type": "application/json",
        UID: uid,
      },
      method: "POST",
      body: JSON.stringify({
        username: process.env.RESONITE_USER_NAME as string,
        authentication: {
          $type: "password",
          password: process.env.RESONITE_USER_PASS as string,
        },
        secretMachineId: process.env.RESONITE_HW_ID,
        rememberMe: false,
      }),
    })
  ).json();
  const token = auth.entity.token;
  const userId = auth.entity.userId;

  // Resonite Contacts 取得
  const contacts: UserContactsResponse = await (
    await fetch(`https://api.resonite.com/users/${userId}/contacts`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `res ${userId}:${token}`,
        UID: uid,
      },
    })
  ).json();

  console.log(
    contacts,
    contacts.filter((c) => c.isAccepted === true)
  );

  return contacts.filter((c) => c.isAccepted).map((c) => c.id);
};
