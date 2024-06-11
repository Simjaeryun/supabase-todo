import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer";

type ShareDrawerProps = {
  title?: string;
  buttonText: string;
  buttonComponent?: React.ReactNode;
  children: React.ReactNode;
};

export default function Drawer({
  title,
  buttonText,
  buttonComponent,
  children,
}: ShareDrawerProps) {
  return (
    <ShadcnDrawer>
      <DrawerTrigger>
        {buttonComponent ? buttonComponent : buttonText}
      </DrawerTrigger>
      <DrawerContent title={title}>{children}</DrawerContent>
    </ShadcnDrawer>
  );
}
