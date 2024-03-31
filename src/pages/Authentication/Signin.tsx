import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationNyanCat from "./nyan.json";
import { Formik } from "formik";
import * as Yup from "yup";
import { setUser } from "@/store/userConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useEffect } from "react";
import { UserInformation } from "@/models/models";
import {
  generateRandomAddress,
  generateRandomCardNumber,
  generateRandomCity,
  generateRandomFullName,
  generateRandomPhoneNumber,
  generateRandomState,
  generateRandomUsername,
  generateRandomZipCode,
} from "./randomDataGenerator";

const optionsNyanCatAnimation = {
  loop: true,
  autoplay: true,
  animationData: animationNyanCat,
};

function Signin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userConfig = useSelector((state: IRootState) => state.userConfig);

  useEffect(() => {
    if (Object.keys(userConfig.user).length > 0) {
      navigate("/gatitos");
    }
  }, [dispatch, userConfig, navigate]);

  // Simulación de datos de usuario
  const generateRandomUserData = (email: string) => {
    const randomUserId = Math.random().toString(36).substring(7);
    const randomDate = new Date().toDateString();

    // Simulación de detalles del usuario
    const userDetails = {
      fullName: generateRandomFullName(),
      username: generateRandomUsername(),
      shippingInformation: {
        fullName: generateRandomFullName(),
        address: generateRandomAddress(),
        city: generateRandomCity(),
        state: generateRandomState(),
        zipCode: generateRandomZipCode(),
      },
      billingInformation: "Same as shipping address",
      customerInformation: {
        customer: generateRandomFullName(),
        email: email,
        phone: generateRandomPhoneNumber(),
      },
      paymentInformation: {
        method: "Visa",
        cardNumber: generateRandomCardNumber(),
      },
    };

    return {
      userId: randomUserId,
      date: randomDate,
      userDetails: userDetails,
    };
  };

  // Función de inicio de sesión
  const userSignIn = (email: string) => {
    const userData = generateRandomUserData(email);
    dispatch(setUser(userData));
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log(values);
        userSignIn(values.email);
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">
                  Welcome to <span className="underline">Gatitos App</span>
                </h1>
                <Lottie
                  options={optionsNyanCatAnimation}
                  speed={1}
                  width={"70%"}
                  isClickToPauseDisabled={true}
                />
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="email">Email</Label>
                    </div>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="frontend@57blocks.io"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && (
                      <div className="text-red-200">{errors.email}</div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    {errors.password && (
                      <div className="text-red-200">{errors.password}</div>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Enjoy our cats! | Created by {""}
                <NavLink to="#" className="underline">
                  57Blocks.io
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/gatitoscover.svg"
              alt="Image"
              className="h-full w-full object-cover "
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Signin;
