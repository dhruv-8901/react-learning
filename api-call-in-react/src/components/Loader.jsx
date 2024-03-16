import { InfinitySpin } from "react-loader-spinner";
export const Loader = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Ensure it appears above other content
        }}
      >
        <InfinitySpin
          visible={true}
          width={200}
          height={200}
          color="black"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  );
};
