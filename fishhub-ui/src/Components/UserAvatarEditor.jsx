import React from "react";
import AvatarEditor from "react-avatar-editor";
import SampleUserImg from "../Images/sample-user.webp";

export default function UserAvatarEditor() {
  return (
    <AvatarEditor
      image={SampleUserImg}
      width={250}
      height={250}
      border={50}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1.2}
      rotate={0}
    />
  );
}
