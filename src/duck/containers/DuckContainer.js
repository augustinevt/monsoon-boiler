import React from 'react';
import { connect } from 'react-redux';
import api from './../../api';

import DuckComponent from './../components/DuckComponent';

import { LoadingIndicator, Card } from '@monsoon_inc/monsoon-components';

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loading: state.users.loading,
  };
};

export class DuckContainer extends React.Component {
  constructor(props) {
    super(props);

    this.exAsyncCall = this.exAsyncCall.bind(this);
  };

  async componentDidMount()  {
    this.props.dispatch({type: "USER_FETCH_REQUESTED", payload: {}});
    // this.exAsyncCall();
  }

  async exAsyncCall() {
    try {
      const users = await api('fake_data', {txnId: 3});
      const posts = await api('fake_data_2', {txnId: 3});
      console.log('users', users.body);
      console.log('posts', posts.body);
    } catch (e) {
      console.log('error', e);
    }
  }

  makeUserCards() {
    return this.props.users.map( user => {
      return <Card title={user.name}>
        <div> {user.email} </div>
        <div> {user.phone} </div>
        <div> {user.website} </div>
      </Card>;
    });
  }

  render() {
    const jsx = this.props.loading ? <LoadingIndicator /> : <div className="duck-container">{process.env.NODE_ENV}<br/>{process.env.REACT_HELLO}</div>;
    const users = this.makeUserCards();
    return (
      <div>
        <DuckComponent foo={''}/>
        <h1> EOA UTILS </h1>
        <div className="duck-container__user-grid">
          { users }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DuckContainer);
