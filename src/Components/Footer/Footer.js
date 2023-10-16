import React from "react";

import FooterInput from "./FooterInput";

import { ReactComponent as BikeProLogo } from "./imgs/logo.svg";

import { ReactComponent as FacebookIcon } from "./imgs/facebook-icon.svg";
import { ReactComponent as InstagramIcon } from "./imgs/instagram-icon.svg";
import { ReactComponent as TwitterIcon } from "./imgs/twitter-icon.svg";

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div id="footer">
        <div className="footerContainer">
          <div className="footerTop">
            <div className="footerTopContent container">
              <div className="logoFooter">
                <BikeProLogo></BikeProLogo>
              </div>
              <nav>
                <h3>Institucional</h3>
                <ul>
                  <li>
                    <a href="#">Sobre nós</a>
                  </li>
                  <li>
                    <a href="#">Trabalhe conosco</a>
                  </li>
                  <li>
                    <a href="#">Encontre uma loja</a>
                  </li>
                  <li>
                    <a href="#">Fale conosco</a>
                  </li>
                </ul>
              </nav>
              <nav>
                <h3>Explorar</h3>
                <ul>
                  <li>
                    <a href="#">Bicicletas</a>
                  </li>
                  <li>
                    <a href="#">E-Bikes</a>
                  </li>
                  <li>
                    <a href="#">Equipamentos</a>
                  </li>
                  <li>
                    <a href="#">Outlet</a>
                  </li>
                  <li>
                    <a href="#">Encontre a bike ideal para você</a>
                  </li>
                </ul>
              </nav>
              <nav>
                <h3>Suporte</h3>
                <ul>
                  <li>
                    <a href="">Ajuda</a>
                  </li>
                  <li>
                    <a href="">Devoluções e trocas</a>
                  </li>
                  <li>
                    <a href="">Central de suporte</a>
                  </li>
                  <li>
                    <a href="">Garantia</a>
                  </li>
                  <li>
                    <a href="">Arquivos da bicicletas</a>
                  </li>
                  <li>
                    <a href="">Pagamento e financiamento</a>
                  </li>
                  <li>
                    <a href="">Perguntas frequentes</a>
                  </li>
                </ul>
              </nav>
              <div className="footerRight">
                <div className="footerRow">
                  <div className="followSocialNetworks">
                    <h2>Nos acompanhe nas redes sociais</h2>

                    <div className="socialNetworksIcons">
                      <a href="" target="_blank">
                        <FacebookIcon></FacebookIcon>
                      </a>
                      <a href="" target="_blank">
                        <InstagramIcon></InstagramIcon>
                      </a>
                      <a href="" target="_blank">
                        <TwitterIcon></TwitterIcon>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footerRow">
                  <h2>Fique por dentro das novidades</h2>
                  <FooterInput></FooterInput>
                </div>
              </div>
            </div>
          </div>
          <div className="footerBottom">
            <div className="footerBottomContent container">
              <span>© Cycling Sports Group, Inc. 2022</span>
              <span>|</span>
              <span>
                <a href="">Terms of Service</a>
              </span>
              <span>|</span>
              <span>
                <a href="">Privacy Policy</a>
              </span>
              <span>|</span>
              <span>
                <a href="">Cookie Settings</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
