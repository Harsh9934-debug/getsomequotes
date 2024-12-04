import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import {
  AppShell,
  Avatar,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { SignOut } from "@phosphor-icons/react";
import { Toaster } from "react-hot-toast";

import BottomNavigationBar from "../BottomBar";
import BrandLogo from "../Logo";
import SignInPrompt from "../NotSignedIn";
import FeedbackButton from "./FeedBack";
import UserProfileCard from "./UserCard";
import NavigationRoutes from "./NavRoutes";

import { dark_theme } from "@/app/config/theme";
import ThemeSwitcher from "./ThemeSwitcher";
import { memo } from "react";
import RightBookSidebar from "../home/RightBookSideBar";
import { usePathname } from "next/navigation";

function AppShellLayout({ children }) {
  const mantineTheme = useMantineTheme();
  const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const isCompactScreen = useMediaQuery("(max-width:480px)");
  const isTabletScreen = useMediaQuery("(max-width:767px)");
  const isDesktopScreen = useMediaQuery("(min-width:1250px)");

  const colorScheme = useComputedColorScheme();
  const [isNavbarOpen, { toggle: toggleNavbar }] = useDisclosure();
  const { user } = useUser();

  const AppShellHeader = memo(() => (
    <AppShell.Header bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}>
      <Group justify="space-between" h="100%" px="md">
        {isTabletScreen && <Avatar src={user?.imageUrl} onClick={toggleNavbar} alt={user?.fullName} size={32} />}
        <BrandLogo />
        {isTabletScreen && <ThemeSwitcher />}
        {!isTabletScreen && <FeedbackButton />}
      </Group>
    </AppShell.Header>
  ));

  AppShellHeader.displayName = "AppShellHeader";

  const pathname = usePathname();

  return (
    <>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
      <SignedIn>
        <AppShell
          bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !isNavbarOpen },
          }}
        >
          <Toaster position="bottom-center" reverseOrder={false} />
          <AppShellHeader />
      <AppShell.Navbar p="md" bg={colorScheme === "dark" ? "#0f1523" : mantineTheme.colors.gray[0]}>
        <Stack gap={0} h="100%" justify="space-between">
          <Stack gap={0}>
            <UserProfileCard
              colorScheme={colorScheme}
              fullName={user?.fullName}
              emailAddress={user?.emailAddresses[0]?.emailAddress}
              imageUrl={user?.imageUrl}
              color={colorScheme === "dark" ? "rgb(19, 27, 46)" : mantineTheme.colors.gray[0]}
            />
            <NavigationRoutes toggle={toggleNavbar} colorScheme={colorScheme} />
          </Stack>
          <Group mb={"md"} justify="space-between" gap={0}>
            <SignOutButton>
              <Group
                gap="xs"
                align="center"
                p="sm"
                justify="center"
                style={{
                  cursor: "pointer",
                }}
              >
                <Text size="sm" c={colorScheme === "dark" ? dark_theme.main_text_color : "red"} fontWeight={500}>
                  Sign out
                </Text>
                <SignOut
                  weight="bold"
                  color={colorScheme === "dark" ? dark_theme.main_text_color : "#fa5252"}
                  size={16}
                />
              </Group>
            </SignOutButton>
            {!isSmallScreen && <ThemeSwitcher />}
            {isSmallScreen && <FeedbackButton />}
          </Group>
        </Stack>
      </AppShell.Navbar>


          <AppShell.Main style={{ paddingInline: isCompactScreen ? 0 : undefined }}>
            {pathname !== "/uploaded" && isDesktopScreen ? (
              <Group align="flex-start" wrap="nowrap">
                <ScrollArea scrollbarSize={2} h={"100vh"} scrollbars="y">
                  {children}
                </ScrollArea>
                <Divider orientation="vertical" />
                <RightBookSidebar />
              </Group>
            ) : isDesktopScreen ? (
              <Stack>{children}</Stack>
            ) : null}
            {!isDesktopScreen && children}
          </AppShell.Main>

          {/* Bottom Navigation for Small Screens */}
          {isSmallScreen && !isNavbarOpen && <BottomNavigationBar />}
        </AppShell>
      </SignedIn>
    </>
  );
}

export default AppShellLayout;
