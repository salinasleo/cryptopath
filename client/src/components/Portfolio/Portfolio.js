import React from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import $ from 'jquery';

const Portfolio = ({ children }) => (
        <div className="jumbotron text-center">
                <h7>Welcome {localStorage.authentificateduser}! &nbsp; &nbsp; <span title="Logout" class="fas fa-sign-out-alt" id="logout"></span> </h7>
            <Row>
                <Col size="md-12 sm-12">
                    <h2>Coins in your portfolio</h2>
                </Col>
            </Row>
            {children}
        </div>
);

$(document).on("click", '#logout', logout);

function logout() {
    localStorage.clear();
    window.location.reload();
};

export default Portfolio;

