import generateToken from "@/utils/generate-token";

export default function generateRandomName () {
    return "Mystery" + generateToken(6)
}