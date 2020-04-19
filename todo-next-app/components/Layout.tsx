// import Link from "next/link";
import Head from "next/head";
// @ts-ignore
import { Wrapper, NavBar, Box, Flex, Ref, theme } from "bushido-strap";

type Props = {
  title: string;
};

const navHeight: string = "5rem";

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
  <Wrapper aiStart minH="100%">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      {/* <NavBar bg={theme.blackAlpha8} drape>
        <Flex stretch jcCenter h={navHeight}>
          <Flex aiCenter p="0 1rem" pointer>
            <Link href="/" passHref>
              <Ref
                lf
                bold
                pointer
                color={theme.gray0}
                hvrColor={theme.whiteAlpha6}
              >
                Home
              </Ref>
            </Link>
          </Flex>
          <Box w="2rem" />
          <Flex aiCenter p="0 1rem" pointer>
            <Link href="/register" passHref>
              <Ref
                lf
                bold
                pointer
                color={theme.gray0}
                hvrColor={theme.whiteAlpha6}
              >
                Register
              </Ref>
            </Link>
          </Flex>
          <Box w="2rem" />
          <Flex aiCenter p="0 1rem" pointer>
            <Link href="/login" passHref>
              <Ref
                lf
                bold
                pointer
                color={theme.gray0}
                hvrColor={theme.whiteAlpha6}
              >
                Login
              </Ref>
            </Link>
          </Flex>
        </Flex>
        <Box w="98%" h="1px" bg={theme.gray6} backlight />
      </NavBar> */}
    </header>
    <Flex drape stretch>
      <Box h={navHeight} />
      <Box />
      {children}
    </Flex>
  </Wrapper>
);

export default Layout;
