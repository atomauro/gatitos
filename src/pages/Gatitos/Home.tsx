import {
  CatIcon,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Heart,
  Home as HomeIcon,
  LineChart,
  ListFilter,
  LogOutIcon,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  DropdownMenuCheckboxItem,
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
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllGatitosFavorites, resetUser } from "@/store/userConfigSlice";
import { useEffect } from "react";
import { IRootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { resetAllGatitos, setGatitos } from "@/store/gatitosConfigSlice";
import { Gatito } from "@/models/models";

async function fetchGatitos() {
  /* const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10`
  ); */
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=snow&has_breeds=1&api_key=live_5NT3qKutuYHwqiJmClOdrFVPop1v3RoegsxpWZTGVe1YwNdfJKHoYhNOLlIRecMC`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userConfig = useSelector((state: IRootState) => state.userConfig);
  const gatitosConfig = useSelector((state: IRootState) => state.gatitosConfig);
  const gatitosList = useSelector(
    (state: IRootState) => state.gatitosConfig.gatitosList
  );

  const { data, status } = useQuery({
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
  }, [data, status]);

  useEffect(() => {
    if (Object.keys(userConfig.user).length === 0) {
      navigate("/");
    }
  }, [dispatch, userConfig, navigate]);

  function logoutUser() {
    dispatch(resetAllGatitosFavorites());
    dispatch(resetAllGatitos());
    dispatch(resetUser());
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
                <NavLink
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                <NavLink
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <CatIcon className="h-5 w-5" />
                  Gatitos
                </NavLink>
                <NavLink
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </NavLink>
                <NavLink
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
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
                  <NavLink to="#">Dashboard</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <NavLink to="#">Gatitos</NavLink>
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
                  <CardDescription>All Beauties</CardDescription>
                  <CardTitle className="text-4xl">
                    {gatitosList.length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Your Favorites</CardDescription>
                  <CardTitle className="text-3xl">0</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All Cats</TabsTrigger>
                  <TabsTrigger value="favorites">Your Favorites</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Select>
                    <span>Available Breeds: </span>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="abyssinian">Abyssinian</SelectItem>
                        <SelectItem value="aegean">Aegean</SelectItem>
                        <SelectItem value="americanbobtail">
                          American Bobtail
                        </SelectItem>
                        <SelectItem value="americancurl">
                          American Curl
                        </SelectItem>
                        <SelectItem value="americanshorthair">
                          American Shorthair
                        </SelectItem>
                        <SelectItem value="americanwirehair">
                          American Wirehair
                        </SelectItem>
                        <SelectItem value="arabianmau">Arabian Mau</SelectItem>
                        <SelectItem value="australianmist">
                          Australian Mist
                        </SelectItem>
                        <SelectItem value="balinese">Balinese</SelectItem>
                        <SelectItem value="bambino">Bambino</SelectItem>
                        <SelectItem value="bengal">Bengal</SelectItem>
                        <SelectItem value="birman">Birman</SelectItem>
                        <SelectItem value="bombay">Bombay</SelectItem>
                        <SelectItem value="britishlonghair">
                          British Longhair
                        </SelectItem>
                        <SelectItem value="britishshorthair">
                          British Shorthair
                        </SelectItem>
                        <SelectItem value="burmese">Burmese</SelectItem>
                        <SelectItem value="burmilla">Burmilla</SelectItem>
                        <SelectItem value="californiaspangled">
                          California Spangled
                        </SelectItem>
                        <SelectItem value="chantillytiffany">
                          Chantilly-Tiffany
                        </SelectItem>
                        <SelectItem value="chartreux">Chartreux</SelectItem>
                        <SelectItem value="chausie">Chausie</SelectItem>
                        <SelectItem value="cheetoh">Cheetoh</SelectItem>
                        <SelectItem value="colorpointshorthair">
                          Colorpoint Shorthair
                        </SelectItem>
                        <SelectItem value="cornishrex">Cornish Rex</SelectItem>
                        <SelectItem value="cymric">Cymric</SelectItem>
                        <SelectItem value="cyprus">Cyprus</SelectItem>
                        <SelectItem value="devonrex">Devon Rex</SelectItem>
                        <SelectItem value="donskoy">Donskoy</SelectItem>
                        <SelectItem value="dragonli">Dragon Li</SelectItem>
                        <SelectItem value="egyptianmau">
                          Egyptian Mau
                        </SelectItem>
                        <SelectItem value="europeanburmese">
                          European Burmese
                        </SelectItem>
                        <SelectItem value="exoticshorthair">
                          Exotic Shorthair
                        </SelectItem>
                        <SelectItem value="havanabrown">
                          Havana Brown
                        </SelectItem>
                        <SelectItem value="himalayan">Himalayan</SelectItem>
                        <SelectItem value="japanesebobtail">
                          Japanese Bobtail
                        </SelectItem>
                        <SelectItem value="javanese">Javanese</SelectItem>
                        <SelectItem value="khaomanee">Khao Manee</SelectItem>
                        <SelectItem value="korat">Korat</SelectItem>
                        <SelectItem value="kurilian">Kurilian</SelectItem>
                        <SelectItem value="laperm">LaPerm</SelectItem>
                        <SelectItem value="mainecoon">Maine Coon</SelectItem>
                        <SelectItem value="malayan">Malayan</SelectItem>
                        <SelectItem value="manx">Manx</SelectItem>
                        <SelectItem value="munchkin">Munchkin</SelectItem>
                        <SelectItem value="nebelung">Nebelung</SelectItem>
                        <SelectItem value="norwegianforestcat">
                          Norwegian Forest Cat
                        </SelectItem>
                        <SelectItem value="ocicat">Ocicat</SelectItem>
                        <SelectItem value="oriental">Oriental</SelectItem>
                        <SelectItem value="persian">Persian</SelectItem>
                        <SelectItem value="pixiebob">Pixie-bob</SelectItem>
                        <SelectItem value="ragamuffin">Ragamuffin</SelectItem>
                        <SelectItem value="ragdoll">Ragdoll</SelectItem>
                        <SelectItem value="russianblue">
                          Russian Blue
                        </SelectItem>
                        <SelectItem value="savannah">Savannah</SelectItem>
                        <SelectItem value="scottishfold">
                          Scottish Fold
                        </SelectItem>
                        <SelectItem value="selkirkrex">Selkirk Rex</SelectItem>
                        <SelectItem value="siamese">Siamese</SelectItem>
                        <SelectItem value="siberian">Siberian</SelectItem>
                        <SelectItem value="singapura">Singapura</SelectItem>
                        <SelectItem value="snowshoe">Snowshoe</SelectItem>
                        <SelectItem value="somali">Somali</SelectItem>
                        <SelectItem value="sphynx">Sphynx</SelectItem>
                        <SelectItem value="tonkinese">Tonkinese</SelectItem>
                        <SelectItem value="toyger">Toyger</SelectItem>
                        <SelectItem value="turkishangora">
                          Turkish Angora
                        </SelectItem>
                        <SelectItem value="turkishvan">Turkish Van</SelectItem>
                        <SelectItem value="yorkchocolate">
                          York Chocolate
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button>Get New Gatitos!</Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Gatitos</CardTitle>
                    <CardDescription>
                      Recent Gatitos from your internet. Soon we will have memes
                      too, stay tune!
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
                                    >
                                      Add to favorites{" "}
                                      <Heart className="h-6 w-6" />
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
                    <Pagination className="ml-auto mr-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="sr-only">Previous Order</span>
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="sr-only">Next Order</span>
                          </Button>
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
    </div>
  );
}
export default Home;
