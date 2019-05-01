import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

class ShoppingList extends Component {
    state = {
        items: [
            {id: uuid(), name: "Beaker"},
            {id: uuid(), name: "Calico"},
            {id: uuid(), name: "Bug"},
            {id: uuid(), name: "Elvis"}
        ]
    }

    render() {
        const { items } = this.state;
        return (
            <Container>
                <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if(name) {
                            this.setState(state => ({
                                items: [...state.items, {id: uuid(), name: name}]
                            }));
                        }
                    }}
                >Add Item</Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id, name}) => (
                            <CSSTransition key={id} timeout={250} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                      className="remove-btn"
                                      color="danger"
                                      size="sm"
                                      onClick={() => {
                                          this.setState(state => ({
                                             items: state.items.filter( i => i.id !== id)
                                          }))
                                      }} 
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        );
    }
}

export default ShoppingList;
