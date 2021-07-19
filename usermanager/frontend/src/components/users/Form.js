import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/users';

export class Form extends Component {
  state = {
    selectedFile: '',
    validDocumentType: false,
    documentTypeError: ''
  };

  static propTypes = {
    addUser: PropTypes.func.isRequired
  };

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    if(e.target.files[0].type == "application/json") {
        this.setState(
        {
            validDocumentType: true,
            documentTypeError: ''
        });
    }
    else {
        this.setState(
        {
            validDocumentType: false,
            documentTypeError: 'Please select a valid document type (.json file)'
        });
    }
  };

  onFileUpload = (e) => {
    e.preventDefault();
    const { selectedFile } = this.state;
    const fileReader = new FileReader();
    fileReader.readAsText(this.state.selectedFile, "UTF-8");
    var all_users;
    fileReader.onload = e => {
        all_users = JSON.parse(e.target.result);
        all_users.forEach(user => {
            var userId = user.userId;
            var title = user.title;
            var body = user.body;
            var userData = { userId, title, body };
            this.props.addUser(userData);
        });
        window.alert('Users onboarded successfully');
    };
    this.setState({
      selectedFile: '',
      validDocumentType: false
    });
  };

  render() {
    const { selectedFile } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Upload User</h2>
        <div>
            <p>
                <input type="file" onChange={this.onFileChange} />
                <button disabled={!this.state.validDocumentType} onClick={this.onFileUpload}>Upload</button>
                <br /> <em>{this.state.documentTypeError}</em>
            </p>
        </div>
      </div>
    );
  }
}

export default connect(null, { addUser })(Form);
