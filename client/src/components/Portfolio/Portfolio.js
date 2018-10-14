import React , { Component } from "react";
import "./Portfolio.css";
import { Col, Row, Container } from "../../components/Grid";
import AddCoin from "../../components/AddCoin";
import $ from 'jquery';
import { Input, TextArea, FormBtn, FormBtn2 } from "../../components/Form";


$(document).on("click", '#logout', logout);

function logout() {
    localStorage.clear();
    window.location.reload();
};

const datenow=  Date.now();
// const monthplaceholder = datenow.getMonth();
// const yearplaceholder = datenow.getDay();
// const dayplaceholder = datenow.getYear();

class Portfolio extends Component {
    state = {
        addcoins: false
    };

    renderPage = () => {
        if (this.state.addcoins) {
            return <AddCoin />;
        }
    };

    render() {
        return (
                <div className="jumbotron text-center">
                    <h7>Welcome {localStorage.authentificateduser}! &nbsp; &nbsp; <span title="Logout" class="fas fa-sign-out-alt" id="logout"></span> </h7>
                    <Row>
                        <Col size="md-12 sm-12">
                            <h2>Coins in your portfolio <span title="Add Coins" class="fa fa-plus" id="addcoin"></span></h2>
                        </Col>
                    </Row>


<Row>
<Col size="md-5"></Col>
<Col size="md-2">
  <form>
    <Input
      value={this.state.username}
      onChange={this.handleInputChange}
      name="Coin"
      placeholder="BTC"
    />
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="Quantity"
      placeholder="Quantity"
    />
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="Cost Basis"
      placeholder="$USD Cost"
    />
    <Input
      value={this.state.password}
      onChange={this.handleInputChange}
      name="Purchase Date"
      placeholder= "10/16/2018" /*{datenow}*/
    />
    <FormBtn
      disabled={!(this.state.username && this.state.password)}
      onClick={this.signOn3}
    >
      Add Coin
    </FormBtn>
  </form>
</Col>
</Row>

            </div>
 );
}

};

export default Portfolio;

