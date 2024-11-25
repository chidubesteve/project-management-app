import { Authenticator, ThemeProvider, Theme } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import Image from "next/image";
import React from "react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: { required: true },
    },
    email: {
      order: 1,
      placeholder: "Enter your email address",
      label: "Email",
      inputProps: { type: "email", required: true },
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      inputProps: { type: "password", required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: { type: "password", required: true },
    },
  },
};

// Custom theme configuration
const theme: Theme = {
  name: "custom-auth-theme",
  tokens: {
    colors: {
      brand: {
        primary: { value: "#0f755f" }, // Main primary color
        secondary: { value: "#0b5b4b" }, // Darker variant for hover
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: "{colors.brand.primary}" },
          color: { value: "white" },
          _hover: {
            backgroundColor: { value: "{colors.brand.secondary}" },
          },
          _focus: {
            backgroundColor: { value: "{colors.brand.secondary}" },
          },
          _active: {
            backgroundColor: { value: "{colors.brand.secondary}" },
          },
          _disabled: {
            backgroundColor: { value: "gray" },
            color: { value: "white" },
          },
        },
      },
      tabs: {
        item: {
          color: { value: "inherit" }, // Default color for unselected tabs
          borderWidth: { value: "0" },
          borderColor: { value: "transparent" }, // No border for unselected tabs
          _hover: {
            color: { value: "{colors.brand.primary}" }, // Green text on hover for unselected tabs
          },
          _active: {
            color: { value: "{colors.brand.primary}" }, // Green text for selected tab
            borderColor: { value: "{colors.brand.primary}" }, // Green top border for selected tab
          },
        },
      },
    },
  },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen flex-col items-center gap-6">
        <Image
          src={
            "https://project-mgt-s3-images-bucket.s3.us-east-1.amazonaws.com/logo.png"
          }
          width={300}
          height={250}
          alt="logo"
          quality={100}
          className="h-[200px] w-auto object-contain"
        />

        <div>
          <Authenticator formFields={formFields}>
            {({ user }: any) =>
              user ? (
                <div>{children}</div>
              ) : (
                <div>
                  <h1>Please sign in below:</h1>
                </div>
              )
            }
          </Authenticator>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AuthProvider;
