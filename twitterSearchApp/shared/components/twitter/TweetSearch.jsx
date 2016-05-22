import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import TweetTable from './TweetTable';
import TextInput from '../util/TextInput';
import { searchTweets } from '../../services/twitter';

export default class TweetSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: [ ]
    };
  }

  onQueryChange = (query) => {
    let updateTweetTable = (tweets) => {
      console.log('RECEIVED TWEETS:', tweets);
      this.setState({
        tweets: tweets
      });
    };

    let onError = function(err) {
      console.error(
        'Failed to get tweets matching query "' + query + '":' + JSON.stringify(err));
    };

    // TODO: cancel outstanding requests before making a new one.
    // This prevents races, etc.
    searchTweets(query).then(updateTweetTable, onError);
  };

  render() {
    return (
      <div>
        <PageHeader>Search</PageHeader>
        <Row>
          <Col xs={12}>
            <TextInput placeholder="search twitter" onChange={ this.onQueryChange } />
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TweetTable tweets={ this.state.tweets } />
          </Col>
        </Row>
      </div>
    );
  }
}
