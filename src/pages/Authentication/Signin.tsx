import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationNyanCat from "./nyan.json";

const optionsNyanCatAnimation = {
  loop: true,
  autoplay: true,
  animationData: animationNyanCat,
};

function Signin() {
  const navigate = useNavigate();
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Welcome to <span className="underline">Gatitos App</span>
            </h1>
            <Lottie
              options={optionsNyanCatAnimation}
              speed={1} // Cambia la velocidad a 0.1
              width={"70%"}
              isClickToPauseDisabled={true}
            />
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
              </div>

              <Input
                id="email"
                type="email"
                placeholder="frontend@57blocks.io"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="Introduce your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => navigate("/gatitos")}
            >
              Login
            </Button>
          </div>
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
  );
}

export default Signin;
