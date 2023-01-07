import InstagramUsernameData from "../models/instagramUsernameData";

export default async function testUsername(user: string) {
    return InstagramUsernameData.find({ user: user });
}