import {
  CatIcon,
  HeartIcon,
  Home as HomeIcon,
  Lightbulb,
  LineChart,
  LogOutIcon,
  Package,
  Package2,
  PanelLeft,
  Search,
  User,
  UserIcon,
  Users2,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAllGatitosFavorites,
  resetUser,
  setGatitosFavorites,
} from "@/store/userConfigSlice";
import { KeyboardEvent, useEffect, useState } from "react";
import { IRootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { resetAllGatitos, setGatitos } from "@/store/gatitosConfigSlice";
import { Breed, Gatito } from "@/models/Gatito/Gatito";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { breedsCurrentOptions } from "@/models/Gatito/breedsCurrentOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import animationLoaderCat from "@/assets/animations/loadercat.json";
import Lottie from "react-lottie";

const optionsLoaderAnimation = {
  loop: true,
  autoplay: true,
  animationData: animationLoaderCat,
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userConfig = useSelector((state: IRootState) => state.userConfig);
  const gatitosConfig = useSelector((state: IRootState) => state.gatitosConfig);
  const [currentBreed, setCurrentBreed] = useState("snow");

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const gatitosList = useSelector(
    (state: IRootState) => state.gatitosConfig.gatitosList
  );
  const gatitosFavoriteList = useSelector(
    (state: IRootState) => state.userConfig.gatitosFavoriteList
  );

  async function fetchGatitos() {
    /* const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10`
    ); */
    console.log("fetchGatitos", currentBreed);
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${currentBreed}&has_breeds=1&api_key=live_5NT3qKutuYHwqiJmClOdrFVPop1v3RoegsxpWZTGVe1YwNdfJKHoYhNOLlIRecMC`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }

  const { data, status, refetch } = useQuery({
    queryKey: ["gatitos"],
    queryFn: fetchGatitos,
  });

  useEffect(() => {
    console.log("RQ", { data, status });
    if (data && status === "success") {
      if (data.length > 0) {
        dispatch(setGatitos(data));
      }
    }
  }, [dispatch, data, status]);

  useEffect(() => {
    if (Object.keys(userConfig.user).length === 0) {
      navigate("/");
    }
  }, [dispatch, userConfig, navigate]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchDialog((openSearchDialog) => !openSearchDialog);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
    if (gatitosFavoriteList.length > 0) {
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
                <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                  <img
                    src="/imagotipo.png"
                    className="h-5 transition-all group-hover:scale-110"
                  />
                  <span className="sr-only">Gatitos App</span>
                </div>
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
                  to="/gatitos"
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
                <div className="group flex shrink-0 items-center justify-center gap-2 text-lg font-semibold  md:text-base">
                  <img src="/imagotipo.png" className="h-5" />
                  <span>Gatitos App</span>
                </div>

                <NavLink
                  to="/gatitos"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <CatIcon className="h-5 w-5" />
                  Gatitos
                </NavLink>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </NavLink>
                <span
                  onClick={() => logoutUser()}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOutIcon className="h-5 w-5" />
                  Logout
                </span>
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
          <div className="relative ml-auto flex-1 md:grow-0  flex jusfiy-between items-center">
            <Button
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              onClick={() => setOpenSearchDialog(true)}
            >
              <Search color="white" className="absolute left-2.5 h-4 w-4" />
              <span className="text-white text-center ml-4">Search</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.webp"
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-5">
                  <CardTitle>Gatitos App</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Gatitos App by{" "}
                    <a
                      href="https://57blocks.io"
                      target="_blank"
                      className="underline"
                    >
                      57Blocks.io
                    </a>{" "}
                    <b>Mark your gatito as favorite and enjoy the cuteness!</b>
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Currently Showing</CardDescription>
                  <CardTitle className="text-4xl">
                    {gatitosList.length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Your Favorites</CardDescription>
                  <CardTitle className="text-3xl">
                    {gatitosFavoriteList.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All Cats</TabsTrigger>
                  <TabsTrigger value="favorites">Your Favorites</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Gatitos</CardTitle>
                    <CardDescription>
                      Recent Gatitos your internet. Soon we will have memes too,
                      stay tune!
                      <div className="flex flex-column">
                        <div className="ml-auto flex items-center gap-2">
                          <Select
                            value={currentBreed}
                            onValueChange={setCurrentBreed}
                          >
                            <span>Available Breeds: </span>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a breed" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="abys">Abyssinian</SelectItem>
                                <SelectItem value="aege">Aegean</SelectItem>
                                <SelectItem value="abob">
                                  American Bobtail
                                </SelectItem>
                                <SelectItem value="acur">
                                  American Curl
                                </SelectItem>
                                <SelectItem value="asho">
                                  American Shorthair
                                </SelectItem>
                                <SelectItem value="awir">
                                  American Wirehair
                                </SelectItem>
                                <SelectItem value="amau">
                                  Arabian Mau
                                </SelectItem>
                                <SelectItem value="amis">
                                  Australian Mist
                                </SelectItem>
                                <SelectItem value="bali">Balinese</SelectItem>
                                <SelectItem value="bamb">Bambino</SelectItem>
                                <SelectItem value="beng">Bengal</SelectItem>
                                <SelectItem value="birm">Birman</SelectItem>
                                <SelectItem value="bomb">Bombay</SelectItem>
                                <SelectItem value="bslo">
                                  British Longhair
                                </SelectItem>
                                <SelectItem value="bsho">
                                  British Shorthair
                                </SelectItem>
                                <SelectItem value="bure">Burmese</SelectItem>
                                <SelectItem value="buri">Burmilla</SelectItem>
                                <SelectItem value="cspa">
                                  California Spangled
                                </SelectItem>
                                <SelectItem value="ctif">
                                  Chantilly-Tiffany
                                </SelectItem>
                                <SelectItem value="char">Chartreux</SelectItem>
                                <SelectItem value="chau">Chausie</SelectItem>
                                <SelectItem value="chee">Cheetoh</SelectItem>
                                <SelectItem value="csho">
                                  Colorpoint Shorthair
                                </SelectItem>
                                <SelectItem value="crex">
                                  Cornish Rex
                                </SelectItem>
                                <SelectItem value="cymr">Cymric</SelectItem>
                                <SelectItem value="cypr">Cyprus</SelectItem>
                                <SelectItem value="drex">Devon Rex</SelectItem>
                                <SelectItem value="dons">Donskoy</SelectItem>
                                <SelectItem value="lihu">Dragon Li</SelectItem>
                                <SelectItem value="emau">
                                  Egyptian Mau
                                </SelectItem>
                                <SelectItem value="ebur">
                                  European Burmese
                                </SelectItem>
                                <SelectItem value="esho">
                                  Exotic Shorthair
                                </SelectItem>
                                <SelectItem value="hbro">
                                  Havana Brown
                                </SelectItem>
                                <SelectItem value="hima">Himalayan</SelectItem>
                                <SelectItem value="jbob">
                                  Japanese Bobtail
                                </SelectItem>
                                <SelectItem value="java">Javanese</SelectItem>
                                <SelectItem value="khao">Khao Manee</SelectItem>
                                <SelectItem value="kora">Korat</SelectItem>
                                <SelectItem value="kuri">Kurilian</SelectItem>
                                <SelectItem value="lape">LaPerm</SelectItem>
                                <SelectItem value="mcoo">Maine Coon</SelectItem>
                                <SelectItem value="mala">Malayan</SelectItem>
                                <SelectItem value="manx">Manx</SelectItem>
                                <SelectItem value="munc">Munchkin</SelectItem>
                                <SelectItem value="nebe">Nebelung</SelectItem>
                                <SelectItem value="norw">
                                  Norwegian Forest Cat
                                </SelectItem>
                                <SelectItem value="ocic">Ocicat</SelectItem>
                                <SelectItem value="orie">Oriental</SelectItem>
                                <SelectItem value="pers">Persian</SelectItem>
                                <SelectItem value="pixi">Pixie-bob</SelectItem>
                                <SelectItem value="snow">Snow Shoes</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <Button onClick={() => refetch()}>
                            Get New Gatitos!
                          </Button>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gatitosList.length > 0
                        ? gatitosList.map((gatito: Gatito) => {
                            return (
                              <Card
                                className="relative group overflow-hidden transform transition-transform duration-300 hover:scale-125 hover:shadow-2lg"
                                key={gatito.id}
                              >
                                <CardContent className="group-hover:opacity-75 relative">
                                  <img
                                    src={gatito.url}
                                    alt="Gatito"
                                    className="block w-full h-48 object-cover"
                                  />
                                  <div className="absolute bottom-4 ">
                                    <Button
                                      variant={"default"}
                                      className=" mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={() => {
                                        navigate(
                                          "/gatitos/detail/" + gatito.id
                                        );
                                      }}
                                    >
                                      See Details
                                    </Button>
                                    <Button
                                      variant={"secondary"}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={() => {
                                        addToFavorites(gatito);
                                      }}
                                    >
                                      Add to favorites{" "}
                                      <HeartIcon
                                        className="h-6 w-6 ml-2 "
                                        color={
                                          checkIfFavorite(gatito)
                                            ? "red"
                                            : "white"
                                        }
                                        fill={
                                          checkIfFavorite(gatito) ? "red" : ""
                                        }
                                      />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })
                        : null}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious />
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="favorites">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Look at these beautiful gatitos!</CardTitle>
                    <CardDescription>
                      They are not just simple animals, they are gods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gatitosFavoriteList.length > 0
                        ? gatitosFavoriteList.map((gatito: Gatito) => {
                            return (
                              <Card
                                className="relative group overflow-hidden transform transition-transform duration-300 hover:scale-125 hover:shadow-2lg"
                                key={gatito.id}
                              >
                                <CardContent className="group-hover:opacity-75 relative">
                                  <img
                                    src={gatito.url}
                                    alt="Gatito"
                                    className="block w-full h-48 object-cover"
                                  />
                                  <div className="absolute bottom-4 ">
                                    <Button
                                      variant={"default"}
                                      className=" mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={() => {
                                        navigate(
                                          "/gatitos/detail/" + gatito.id
                                        );
                                      }}
                                    >
                                      See Details
                                    </Button>
                                    <Button
                                      variant={"secondary"}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={() => {
                                        addToFavorites(gatito);
                                      }}
                                    >
                                      Add to favorites{" "}
                                      <HeartIcon
                                        className="h-6 w-6 ml-2 "
                                        color={
                                          checkIfFavorite(gatito)
                                            ? "red"
                                            : "white"
                                        }
                                        fill={
                                          checkIfFavorite(gatito) ? "red" : ""
                                        }
                                      />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })
                        : null}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious />
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <CommandDialog open={openSearchDialog} onOpenChange={setOpenSearchDialog}>
        <CommandInput placeholder="Type a breed to search..." />
        <CommandList>
          <CommandEmpty>
            <span>No results found.</span>
            <Separator className="text-center mb-5 mt-5" />
            <div className="flex items-center flex-row justify-center mt-4 mb-4">
              <Lightbulb className="mr-2 h-4 w-4" />
              <span>About 57Blocks?</span>
            </div>
            <Button
              onClick={() => window.open("https://www.57blocks.io", "_blank")}
            >
              <span>Visit website</span>
            </Button>
          </CommandEmpty>
          <CommandGroup heading="Suggestions | Current Options">
            {breedsCurrentOptions
              ? breedsCurrentOptions.map((breed: Breed) => {
                  return (
                    <CommandItem
                      key={breed.name}
                      className="flex justify-between"
                    >
                      <CatIcon className="mr-2 h-4 w-4" />
                      <span>{breed.name}</span>
                      <Button
                        onClick={() => {
                          setOpenSearchDialog(false);
                          setCurrentBreed(breed.id);
                          refetch();
                        }}
                      >
                        Select
                      </Button>
                      {/*  <Button
                        onClick={() => {
                          setOpenSearchDialog(false);
                          setCurrentBreed(breed.id);
                          refetch();
                        }}
                      >
                        Select
                      </Button> */}
                    </CommandItem>
                  );
                })
              : null}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <AlertDialog open={status == "pending"}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Loading cuteness!</AlertDialogTitle>
            <AlertDialogDescription>
              <Lottie
                options={optionsLoaderAnimation}
                speed={1}
                width={"100%"}
                isClickToPauseDisabled={true}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <span>sad</span>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export default Home;
