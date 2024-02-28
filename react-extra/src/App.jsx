import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import Input from "./components/Input";

function App() {
  const inputRef = useRef(null);
  // return (
  //   <>
  //     <div>
  //       <form>
  //         <input name="text" type="text" ref={inputRef} />
  //         <button type="button" onClick={() => inputRef.current.focus()}>
  //           Test
  //         </button>
  //       </form>
  //     </div>
  //   </>
  // );
  // const { register, handleSubmit, watch } = useForm();
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );
  //   return () => subscription.unsubscribe();
  // }, [watch("text")]);
  // return (
  //   <>
  //     <div>
  //       <form>
  //         <input name="text" type="text" {...register("text")} />
  //         <button type="button">Test</button>
  //       </form>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div>
        <form>
          <Input name="name" type="text" ref={inputRef} />
          <button
            type="button"
            onClick={() => {
              inputRef.current.focus();
              console.log(inputRef.current.value);
            }}
          >
            Test
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
