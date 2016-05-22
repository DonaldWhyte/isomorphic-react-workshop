import React from 'react';
import { Table } from 'react-bootstrap';

function TweetRow(props) {
  return (
    <tr>
      <td>{props.author}</td>
      <td>{props.datetime}</td>
      <td>{props.text}</td>
      <td><a href="{props.link}">view</a></td>
    </tr>
  );
}

export default class TweetTable extends React.Component {

  render() {
    if (this.props.tweets.length == 0) {
      return <p>No tweets match your search query</p>;
    } else {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Group</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.tweets.map(function(tweet) {
                return <TweetRow author={tweet.author} datetime={tweet.datetime}
                                 text={tweet.text} link={tweet.link}
                                 key={[tweet.author, tweet.datetime, tweet.text].join('_')} />
              })
            }
          </tbody>
        </Table>
      );
    }
  }

}
