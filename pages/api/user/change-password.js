import { getSession } from 'next-auth/client'
import { hashPassword, verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

async function handler(req, res) {

    if (req.method !== "PATCH") {
        return;
    }

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({ message: "Not authenticated" })
        return;
    }

    const userEmail = session.user.email

    const { newPassword, oldPassword } = req.body


    const client = await connectToDatabase();

    const userCollection = client.db().collection('users')

    const user = await userCollection.findOne({ email: userEmail })

    if (!user) {
        res.status(404).json({ message: "User not found." })
        client.close()
        return
    }

    const currentPassword = user.password


    console.log("--------------")
    console.log(user, newPassword, oldPassword)

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
        res.stats(403).json({ message: "Invalid password" })
        client.close();
        return
    }

    const hashedPassword = await hashPassword(newPassword)

    const result = await userCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })
    console.log(result);

    client.close()
    res.status(200).json({ message: "Password updated!" })
}

export default handler;