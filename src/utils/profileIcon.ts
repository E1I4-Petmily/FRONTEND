import bird from "../assets/profile-icons/bird.png";
import cat from "../assets/profile-icons/cat.png";
import cheese from "../assets/profile-icons/cheese.png";
import chick from "../assets/profile-icons/chick.png";
import dog from "../assets/profile-icons/dog.png";
import hamster from "../assets/profile-icons/hamster.png";
import pig from "../assets/profile-icons/pig.png";
import rabbit from "../assets/profile-icons/rabbit.png";
import siba from "../assets/profile-icons/siba.png";

//매핑
const profileMap: Record<number, string> = {
  1: cat,
  2: dog,
  3: rabbit,
  4: hamster,
  5: pig,
  6: chick,
  7: cheese,
  8: siba,
  9: bird,
};

//기본 프로필 이미지 혹시몰라서
const defaultProfile = cat;

export function getProfileIcon(profileNumber: number | undefined) {
  if (!profileNumber) return defaultProfile;
  return profileMap[profileNumber] || defaultProfile;
}
