export const PostTime = (createdAt) => {
    const dateObj = new Date(createdAt);
    const now = new Date();
  
    const timeDifference = now.getTime() - dateObj.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);
  
    let formattedTime;
  
    switch (true) {
      case secondsDifference < 60:
        formattedTime = "Just now";
        break;
      case minutesDifference < 60:
        formattedTime = `${minutesDifference}m`;
        break;
      case hoursDifference < 24:
        formattedTime = `${hoursDifference}h`;
        break;
      case daysDifference < 7:
        formattedTime = `${daysDifference}d`;
        break;
      case weeksDifference < 4:
        formattedTime = `${weeksDifference}w`;
        break;
      case monthsDifference < 12:
        formattedTime = `${monthsDifference}mo`;
        break;
      default:
        formattedTime = `${yearsDifference}y`;
    }
  
    return formattedTime;
  };
  
  export default PostTime;
  