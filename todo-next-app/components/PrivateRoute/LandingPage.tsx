import React from "react";

import Link from "next/link";

import { Wrapper, Button, Box, Card, Ref, theme } from "bushido-strap";

export default function LandingPage() {
  return (
    <Wrapper>
      <Card p="4rem">
        <h2>Welcome!</h2>
        <Button green="true" stretch="true">
          <Link href="/register">
            <Ref color={theme.gray0} hvrColor={theme.gray0}>
              Register Today!
            </Ref>
          </Link>
        </Button>
        <Box h="1.2rem" />
        <p>Already have an account?</p>
        <Button blue="true" stretch="true">
          <Link href="/login">
            <Ref color={theme.gray0} hvrColor={theme.gray0}>
              Login here!
            </Ref>
          </Link>
        </Button>
      </Card>
    </Wrapper>
  );
}
