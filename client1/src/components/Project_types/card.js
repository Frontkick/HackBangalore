import React from 'react';
import "./project_card.css";
import Project_page from '../Project_page/Project_page';
import { useState } from 'react';
import { Link } from 'react-router-dom';


let title;
const Card = ({ project }) => {
    title = project.Title;
    

  
  

    return (
        <div>
            <div  className='flex justify-center p-10'><a href={`http://localhost:3000/${project.Title}`}>
                <div className='card border rounded-lg border-black flex flex-row'>
                    <div>
                        <img className='img' src={project.Image_url} alt="#" />
                    </div>
                    <div className='text-x pl-20 pt-5'>
                        <p>
                            {project.Types} | {project.Locations}
                        </p>
                        <br />
                        <div className='flex flex-row'>
                            <p className='text-gray-600 text-3xl'></p>
                            <button id={project.Title} className='ml-10 text-white border rounded-md bg-orange-600'>
                                Book Appointment
                            </button>
                            
                        </div>
                        <br />
                        <p>
                            by <b>{project.Title}</b>
                        </p>
                        <br />
                        <p>
                            {project.About}
                        </p>
                    </div>
                </div></a>
            </div>
        </div>
    )
}

// Exporting the Card component and the variable x
export default Card;
export {title}

