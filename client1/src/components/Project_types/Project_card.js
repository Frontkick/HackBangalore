import React, { useEffect, useState } from 'react';
import './project_card.css';
import Card from './card';
import axios from 'axios';
import Project_page from '../Project_page/Project_page';


const ProjectCard = ({ image }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/organizations'); // Adjust the URL to match your Flask backend
        setOrganizations(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);
  console.log(organizations)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <img className='project-card-image' src='https://www.globalgiving.org/img/banners/hero_give_lg.jpg' alt='#'></img>
      {organizations.map((item)=><Card project={item}/>)}
      
    </div>
  );
}

export default ProjectCard;
