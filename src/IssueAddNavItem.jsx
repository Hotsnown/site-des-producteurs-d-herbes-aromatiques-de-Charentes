import React from 'react';
import { withRouter } from 'react-router';
import { NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar } from 'react-bootstrap';


const plantes = ['camomille', 'romarin', 'lavande', 'menthe'];
const producteurs = ['Pierre', 'Fred', 'Flo', 'Marie'];

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value, title: form.title.value,
      status: 'Libre', created: new Date(),
    };
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          this.props.router.push(`/issues/${updatedIssue._id}`);
        });
      } else {
        response.json().then(error => {
          this.props.showError(`L'ajout du stock a échoué: ${error.message}`);
        });
      }
    }).catch(err => {
      this.props.showError(`Il y a eu une erreur lors du transfert des donneés au serveur : ${err.message}`);
    });
  }

  render() {
    return (
      <NavItem onClick={this.showModal}><Glyphicon glyph="plus" /> Ajouter un stock
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <ControlLabel>Plante</ControlLabel>
                <FormControl componentClass="select" name="title">
                  {plantes.map(item => <option>{item}</option>)}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Producteur</ControlLabel>
                <FormControl componentClass="select" name="owner">
                  {producteurs.map(item => <option>{item}</option>)}
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Confirmer</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Annuler</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </NavItem>
    );
  }
}

IssueAddNavItem.propTypes = {
  router: React.PropTypes.object,
  showError: React.PropTypes.func.isRequired,
};

export default withRouter(IssueAddNavItem);
