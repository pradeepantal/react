import React from 'react';
import VideoModel from '../../model/video';
import Modal from '@bdenzer/react-modal';


const style = require('./style.scss');

export interface VideoProps {
  video: VideoModel,
  callBck:(id: number,video:VideoModel) => void
}

export interface VideoState {
  edit:boolean;
  border:string;
  show:boolean;
}



export default class Video extends React.Component<VideoProps, VideoState> {
  constructor(props, state) {
    super(props);
    this.state = {
      edit:true,
      border:'0' ,
      show:false 
    }
    this.onClick = this.onClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  onClick = (event) => {   
    if(this.state.edit){
      this.setState({ edit : false,border:'1'} );
      
    }else{
      this.setState({ edit : true,border:'0'} );
      console.log(this.props.video);
      this.props.callBck(1,this.props.video);
    }  
  }

  closeModal() {
    this.setState({ show: false });
  }

  openModal() {
    this.setState({ show: true });
  }
  render() {
    return (
     <> <tr id={''+this.props.video.id}><td>{this.props.video.id}</td>
        <td>
          <input style={{border:this.state.border+'px solid #e6e6e6' }}  readOnly= {this.state.edit} type="text" defaultValue={this.props.video.title} />
        </td>
        <td>
          <input style={{border:this.state.border+'px solid #e6e6e6' }} readOnly= {this.state.edit} type="text" defaultValue={this.props.video.genre} />
        </td>
        <td>
          <input style={{border:this.state.border+'px solid #e6e6e6' }} readOnly= {this.state.edit} type="text" defaultValue={this.props.video.description} /> <button onClick={this.openModal}>!</button>
        </td>
        <td><button onClick={this.onClick} value="Edit" >{this.state.edit ? 'Edit' : 'Save'}</button></td></tr>
         <div>
         <Modal
           closeModal={this.closeModal}
           shouldShowModal={this.state.show}>
           {this.props.video.description} 
         </Modal>
        
       </div></>
    );
  }
}
const styles = {
  data: {
    border: '0px'
  }
}
