const BackToHomeButton = () => {
  return (
    <div>
      <Link to={"/"} className="btn btn-ghost mb-6">
        <ArrowLeftIcon className="size-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default BackToHomeButton;
