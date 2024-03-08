import { InfinitySpin } from "react-loader-spinner";
export const Loader = () => {
  return (
    <>
      <InfinitySpin
        visible={false}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </>
  );
};
