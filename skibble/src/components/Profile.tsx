function Profile({ src, status }: { status: boolean; src: string }) {
  return (
    <div className="image-wrapper profile">
      <img src={src} alt="Avatar" />
      <div className={`indictor ${status?"online":"offline"}`}></div>
    </div>
  );
}

export default Profile;
