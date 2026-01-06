
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container>
      <FooterCopyright href="https://github.com/Durannd"  by="Durand" year={2025} />
      <FooterLinkGroup>
        
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#" className="">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
