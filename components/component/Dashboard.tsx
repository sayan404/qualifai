"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import companies from "@/assets/data/companyForInterviewList";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ResponsivePie } from "@nivo/pie";
import { useRouter } from "next/navigation";
import Interview from "../interview/page";
import { Chooser } from "./Chooser";
import CompanyBasedinterview from "./CompanyBasedinterview";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("My Space");
  const [showInterview, setShowInterview] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  function handleNavClick(section: string) {
    setActiveSection(section);
  }
  console.log("companies", companies);

  return (
    <div className="flex flex-col w-full bg-background">
      {showInterview ? (
        <Chooser />
      ) : (
        <>
          {/* <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="flex flex-col gap-2">
                  <div className="flex h-[60px] items-center px-6">
                    <Link
                      href="#"
                      className="flex items-center justify-center"
                      prefetch={false}
                    >
                      <BarChartIcon className="h-6 w-6" />
                      <span className="sr-only">Interview Dashboard</span>
                    </Link>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <nav className="grid items-start px-4 text-sm font-medium">
                      <Link
                        href="#"
                        data-section="My Space"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "My Space"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("My Space")}
                        prefetch={false}
                      >
                        My Space
                      </Link>
                      <Link
                        href="#"
                        data-section="Company-based"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "Company-based"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("Company-based")}
                        prefetch={false}
                      >
                        Company-based
                      </Link>
                      <Link
                        href="#"
                        data-section="Past Interviews"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "Past Interviews"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("Past Interviews")}
                        prefetch={false}
                      >
                        Past Interviews
                      </Link>
                      <Link
                        href="#"
                        data-section="Topic-based"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "Topic-based"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("Topic-based")}
                        prefetch={false}
                      >
                        Topic-based
                      </Link>
                      <Link
                        href="#"
                        data-section="Role-based"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "Role-based"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("Role-based")}
                        prefetch={false}
                      >
                        Role-based
                      </Link>
                      <Link
                        href="#"
                        data-section="Tech Stack"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "Tech Stack"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("Tech Stack")}
                        prefetch={false}
                      >
                        Tech Stack
                      </Link>
                      <Link
                        href="#"
                        data-section="DSA Rounds"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                          activeSection === "DSA Rounds"
                            ? "bg-muted text-primary"
                            : "text-muted-foreground"
                        } transition-all hover:text-primary`}
                        onClick={() => handleNavClick("DSA Rounds")}
                        prefetch={false}
                      >
                        DSA Rounds
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            {showModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 50,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "50%",
                    overflowY: "auto",
                    maxHeight: "80%",
                    color: "black",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "16px",
                    }}
                  >
                    Interview Report
                  </h2>
                  <p style={{ marginBottom: "8px" }}>Name: Divyanshu</p>
                  <p style={{ marginBottom: "8px" }}>
                    Interview for: Microsoft Software Developer
                  </p>
                  <p style={{ marginBottom: "8px" }}>Score: 82%</p>
                  <p style={{ marginBottom: "8px" }}>Verbal Questions: 5</p>
                  <p style={{ marginBottom: "8px" }}>Coding Questions: 2</p>
                  <div style={{ height: "300px" }}>
                    <ResponsivePie
                      data={[
                        { id: "Verbal Questions", value: 5 },
                        { id: "Coding Questions", value: 2 },
                      ]}
                      sortByValue
                      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      cornerRadius={3}
                      padAngle={0.7}
                      innerRadius={0.5}
                      colors={{ scheme: "nivo" }}
                      borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      enableArcLabels
                      arcLabelsRadiusOffset={0.4}
                      arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      marginTop: "16px",
                    }}
                  >
                    Voice Sentiment Analysis
                  </h3>
                  <p style={{ marginBottom: "8px" }}>
                    Overall Sentiment: Positive
                  </p>
                  <p style={{ marginBottom: "8px" }}>
                    Strengths: Clear communication, confident tone, positive
                    energy.
                  </p>
                  <p style={{ marginBottom: "8px" }}>
                    Areas for Improvement: At times, the pace was a bit fast,
                    which may make it difficult for the interviewer to follow.
                  </p>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      marginTop: "16px",
                    }}
                  >
                    Detailed Feedback
                  </h3>
                  <p style={{ marginBottom: "8px" }}>
                    Divyanshu demonstrated excellent problem-solving skills and
                    a strong understanding of the coding concepts. He
                    successfully answered all verbal and coding questions.
                  </p>
                  <p style={{ marginBottom: "8px" }}>
                    To improve further, Divyanshu could focus on slowing down
                    his speech during explanations to ensure clarity and
                    comprehension. Additionally, practicing more complex coding
                    problems could enhance his problem-solving speed and
                    efficiency.
                  </p>
                  <button
                    onClick={handleModalClose}
                    style={{
                      marginTop: "16px",
                      padding: "8px 16px",
                      backgroundColor: "#007BFF",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="flex-1 ml-auto sm:flex-initial">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search interviews..."
                    className="pl-8 w-full sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/images/avatar.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </div>
          </header> */}
          <div className="flex overflow-hidden">
            <div className="hidden md:flex flex-col gap-2 text-foreground bg-background w-[260px] shrink-0">
              {/* <div className="sticky top-0 p-2">
                <Link
                  href="#"
                  className="flex items-center justify-center"
                  prefetch={false}
                >
                  <BarChartIcon className="h-6 w-6" />
                  <span className="sr-only">Interview Dashboard</span>
                </Link>
              </div> */}
              <div className="flex-1 overflow-auto">
                <nav className="grid items-start px-4 text-sm font-medium border-2 rounded-xl p-5 ml-3">
                  <Link
                    href="#"
                    data-section="My Space"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "My Space"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("My Space")}
                    prefetch={false}
                  >
                    My Space
                  </Link>
                  <Link
                    href="#"
                    data-section="Company-based"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "Company-based"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("Company-based")}
                    prefetch={false}
                  >
                    Company-based
                  </Link>
                  <Link
                    href="#"
                    data-section="Past Interviews"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "Past Interviews"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("Past Interviews")}
                    prefetch={false}
                  >
                    Past Interviews
                  </Link>
                  <Link
                    href="#"
                    data-section="Topic-based"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "Topic-based"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("Topic-based")}
                    prefetch={false}
                  >
                    Topic-based
                  </Link>
                  <Link
                    href="#"
                    data-section="Role-based"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "Role-based"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("Role-based")}
                    prefetch={false}
                  >
                    Role-based
                  </Link>
                  <Link
                    href="#"
                    data-section="Tech Stack"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "Tech Stack"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("Tech Stack")}
                    prefetch={false}
                  >
                    Tech Stack
                  </Link>
                  <Link
                    href="#"
                    data-section="DSA Rounds"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      activeSection === "DSA Rounds"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                    onClick={() => handleNavClick("DSA Rounds")}
                    prefetch={false}
                  >
                    DSA Rounds
                  </Link>
                </nav>
              </div>
            </div>
            <main className=" gap-4 p-4 md:gap-8 md:p-10 w-full h-full overflow-auto">
              {activeSection === "Company-based" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {companies &&
                    companies.map((e, idx) => (
                      <CompanyBasedinterview key={idx} companyData={e} />
                    ))}
                </div>
              )}
              {activeSection === "My Space" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2 h-[50vh] lg:grid-cols-3 text-center">
                    
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Past Interview Scores
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <BarChartIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-xs text-muted-foreground">
                          Interviews completed
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Topic-based Interviews
                        </CardTitle>
                        <TagIcon className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                          Algorithms & Data Structures
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Role-based Interviews
                        </CardTitle>
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                          Frontend Engineer
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Tech Stack Interviews
                        </CardTitle>
                        <CodeIcon className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground">
                          React.js
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          DSA Round Interviews
                        </CardTitle>
                        <CodeIcon className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Passed</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="h-full">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Company-based Interviews
                        </CardTitle>
                        <BuildingIcon className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">
                          FAANG Companies
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm">
                          Comming soon
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div>
                    {/* <Card className="h-full">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Interview</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Tech Stack</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Company</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              INV001
                            </TableCell>
                            <TableCell>Algorithms</TableCell>
                            <TableCell>Frontend Engineer</TableCell>
                            <TableCell>React.js</TableCell>
                            <TableCell>85</TableCell>
                            <TableCell>Google</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              INV002
                            </TableCell>
                            <TableCell>Data Structures</TableCell>
                            <TableCell>Backend Engineer</TableCell>
                            <TableCell>Node.js</TableCell>
                            <TableCell>90</TableCell>
                            <TableCell>Amazon</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              INV003
                            </TableCell>
                            <TableCell>System Design</TableCell>
                            <TableCell>Full-stack Engineer</TableCell>
                            <TableCell>React.js, Node.js</TableCell>
                            <TableCell>80</TableCell>
                            <TableCell>Microsoft</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              INV004
                            </TableCell>
                            <TableCell>Algorithms</TableCell>
                            <TableCell>Frontend Engineer</TableCell>
                            <TableCell>React.js</TableCell>
                            <TableCell>75</TableCell>
                            <TableCell>Apple</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              INV005
                            </TableCell>
                            <TableCell>Data Structures</TableCell>
                            <TableCell>Backend Engineer</TableCell>
                            <TableCell>Python</TableCell>
                            <TableCell>85</TableCell>
                            <TableCell>Facebook</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Card>  */}
                  </div>
                </>
              )}
              {activeSection === "Topic-based" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Algorithms
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">DSA</CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>

                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        System Design
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Computer Networks
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        DBMS
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Operating System
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInterview(true)}
                      >
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        System Design (Complete){" "}
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card> 
                </div>
              )}
              {activeSection === "Role-based" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Frontend Developer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Backend Developer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Full Stack Developer
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInterview(true)}
                      >
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        BlockChain Engineer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        ML Engineer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        SDE-Intern
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Cyber Security Engineer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        AI Engineer
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeSection === "Tech Stack" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        MERN Stack
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        React+Nextjs+Typescript
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        DevOps
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        React+Nextjs+Typescript
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Node+Sql+Nosql+Express
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">
                        Java - Springboot
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Python + Flask + Ai Wrappers
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInterview(true)}
                      >
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Sql Databases
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Rust
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Solidity
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card> 
                </div>
              )}

              {/* add company based interview */}

              {activeSection === "DSA Rounds" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                   <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        DSA(0-100)
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Arrays + LinkedList + Strings{" "}
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">
                        Graph + Dynamic Programming
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Recursion + BackTracking
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInterview(true)}
                      >
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Tries
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        Comming soon
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        Interviews completed
                      </p>
                    </CardContent>
                  </Card> 
                </div>
              )}
              {activeSection === "Past Interviews" && (
                <>  No Data available for now
                <Card className="h-full">
                   {/* <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Interview</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Tech Stack</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Company</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell>React.js</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>Google</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Node.js</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>Amazon</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV003</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>80</TableCell>
                        <TableCell>Microsoft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV004</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell>React.js</TableCell>
                        <TableCell>75</TableCell>
                        <TableCell>Apple</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV005</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Python</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>Facebook</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV006</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell>Uber</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV007</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell></TableCell> 
                        <TableCell>82</TableCell>
                        <TableCell>Apple</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV008</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Node.js</TableCell>
                        <TableCell>88</TableCell>
                        <TableCell>Facebook</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV009</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>79</TableCell>
                        <TableCell>Google</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV010</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Python</TableCell>
                        <TableCell>86</TableCell>
                        <TableCell>Amazon</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV011</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>81</TableCell>
                        <TableCell>Microsoft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV012</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell></TableCell> 
                        <TableCell>77</TableCell>
                        <TableCell>Google</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV013</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Node.js</TableCell>
                        <TableCell>89</TableCell>
                        <TableCell>Amazon</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV014</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>83</TableCell>
                        <TableCell>Facebook</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV015</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Python</TableCell>
                        <TableCell>87</TableCell>
                        <TableCell>Microsoft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV016</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell>React.js</TableCell>
                        <TableCell>80</TableCell>
                        <TableCell>Apple</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV017</TableCell>
                        <TableCell>System Design</TableCell>
                        <TableCell>Full-stack Engineer</TableCell>
                        <TableCell>React.js, Node.js</TableCell>
                        <TableCell>84</TableCell>
                        <TableCell>Uber</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV018</TableCell>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>Backend Engineer</TableCell>
                        <TableCell>Node.js</TableCell>
                        <TableCell>92</TableCell>
                        <TableCell>Google</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV019</TableCell>
                        <TableCell>Algorithms</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell>React.js</TableCell>
                        <TableCell>79</TableCell>
                        <TableCell>Microsoft</TableCell>
                      </TableRow>
                      <TableRow onClick={handleModalOpen}>
                        <TableCell className="font-medium">INV020</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>Software Engineerr</TableCell>
                        <TableCell>DSA , Development</TableCell>
                        <TableCell>82</TableCell>
                        <TableCell>Microsoft</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table> */}
                </Card></>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BuildingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PieChart(props: any) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
