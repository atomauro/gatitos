import {
  ArrowLeftCircleIcon,
  CatIcon,
  Heart,
  Home as HomeIcon,
  LineChart,
  LogOutIcon,
  Package2,
  PanelLeft,
  Search,
  SmileIcon,
  User,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useEffect, useState } from "react";
import {
  resetAllGatitosFavorites,
  resetUser,
  setGatitosFavorites,
} from "@/store/userConfigSlice";
import { Gatito } from "@/models/models";
import { resetAllGatitos } from "@/store/gatitosConfigSlice";

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentGatito, setCurrentGatito] = useState<Gatito>();

  const userConfig = useSelector((state: IRootState) => state.userConfig);
  const gatitosList = useSelector(
    (state: IRootState) => state.gatitosConfig.gatitosList
  );
  const gatitosFavoriteList = useSelector(
    (state: IRootState) => state.userConfig.gatitosFavoriteList
  );

  const { id } = useParams();

  useEffect(() => {
    if (gatitosList && gatitosList.length > 0 && id) {
      const foundGatito = gatitosList.find(
        (gatito: Gatito) => gatito.id === id
      );
      setCurrentGatito(foundGatito);
    }
  }, [id, gatitosList]);

  useEffect(() => {
    if (Object.keys(userConfig.user).length === 0) {
      navigate("/");
    }
  }, [dispatch, userConfig, navigate]);

  function logoutUser() {
    dispatch(resetAllGatitos());
    dispatch(resetAllGatitosFavorites());
    dispatch(resetUser());
  }

  function addToFavorites(gatitoToAdd: Gatito) {
    console.log("addToFavorites", { gatitoToAdd, gatitosFavoriteList });
    dispatch(setGatitosFavorites(gatitoToAdd));
  }

  function checkIfFavorite(gatitoToCheck: Gatito) {
    if (gatitosFavoriteList.length > 0 && currentGatito) {
      const foundGatito = gatitosFavoriteList.find(
        (gatito: Gatito) => gatito.id === gatitoToCheck.id
      );
      if (foundGatito) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="#"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <img
                    src="/imagotipo.png"
                    className="h-5 transition-all group-hover:scale-110"
                  />
                  <span className="sr-only">Gatitos App</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                Gatitos App by 57Blocks!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="#"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <CatIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">Home</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => logoutUser()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <NavLink
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                <NavLink
                  to="/gatitos"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/gatitos"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <CatIcon className="h-5 w-5" />
                  Gatitos
                </NavLink>

                <NavLink
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <NavLink to="/gatitos">Dashboard</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <NavLink to="/gatitos">Gatitos</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Gatitos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={"/placeholder-user.webp"}
                  style={{ width: "36px", height: "36" }}
                  alt="Avatar"
                  className="overflow-hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NavLink to="/profile">Profile</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => logoutUser()}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div>
              <Card>
                <CardHeader className="pb-5 flex flex-row items-center">
                  <Button
                    variant={"outline"}
                    className="flex justify-between items-center"
                    onClick={() => navigate("/gatitos")}
                  >
                    <ArrowLeftCircleIcon />
                    <span>Back</span>
                  </Button>
                  <CardTitle className="ml-8"> Gatito Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <img
                      src={currentGatito?.url}
                      style={{ width: "30rem" }}
                      alt="Cat"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-5">
                  <CardTitle>Description</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {currentGatito?.breeds[0]?.description}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Breed</CardDescription>
                  <CardTitle className="text-4xl">
                    {" "}
                    {currentGatito?.breeds[0]?.name}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Make Favorite</CardDescription>
                  <CardContent className="flex items-center justify-center">
                    <Heart
                      className="h-11 w-11"
                      color={
                        checkIfFavorite(currentGatito as Gatito)
                          ? "red"
                          : "white"
                      }
                      fill={
                        checkIfFavorite(currentGatito as Gatito) ? "red" : ""
                      }
                      onClick={() => addToFavorites(currentGatito as Gatito)}
                    />
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Gatito ID
                  </CardTitle>
                  <CardDescription>{currentGatito?.id}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <SmileIcon className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Get Fun Fact
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-semibold">Gatito Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Width (mm)</dt>
                      <dd>{currentGatito?.width}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Height (mm)</dt>
                      <dd>
                        <a href="mailto:">{currentGatito?.height}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Breed Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Breed Name</dt>
                      <dd>{currentGatito?.breeds[0].name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Temperament</dt>
                      <dd className="text-right">
                        {currentGatito?.breeds[0].temperament}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Origin</dt>
                      <dd>{currentGatito?.breeds[0].origin}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Country Code</dt>
                      <dd>{currentGatito?.breeds[0].country_code}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Life Span</dt>
                      <dd>{currentGatito?.breeds[0].life_span}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Adaptability</dt>
                      <dd>{currentGatito?.breeds[0].adaptability}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Affection Level</dt>
                      <dd>{currentGatito?.breeds[0].affection_level}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Child Friendly</dt>
                      <dd>{currentGatito?.breeds[0].child_friendly}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Dog Friendly</dt>
                      <dd>{currentGatito?.breeds[0].dog_friendly}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Energy Level</dt>
                      <dd>{currentGatito?.breeds[0].energy_level}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Grooming</dt>
                      <dd>{currentGatito?.breeds[0].grooming}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Health Issues</dt>
                      <dd>{currentGatito?.breeds[0].health_issues}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Intelligence</dt>
                      <dd>{currentGatito?.breeds[0].intelligence}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Shedding Level</dt>
                      <dd>{currentGatito?.breeds[0].shedding_level}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Social Needs</dt>
                      <dd>{currentGatito?.breeds[0].social_needs}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Stranger Friendly
                      </dt>
                      <dd>{currentGatito?.breeds[0].stranger_friendly}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Vocalisation</dt>
                      <dd>{currentGatito?.breeds[0].vocalisation}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Wikipedia URL</dt>
                      <dd>
                        <a
                          href={currentGatito?.breeds[0].wikipedia_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentGatito?.breeds[0].wikipedia_url}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3"></CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Detail;
