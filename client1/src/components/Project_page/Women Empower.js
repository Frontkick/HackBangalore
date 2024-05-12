import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import './project_page.css'
import axios from 'axios';

const Women_Empower = () => {
    const [organization, setOrganization] = useState(null);
    const [error, setError] = useState(null);
    const [rat, setRat] = useState(null);
    

    useEffect(() => {
      const fetchRating = async () => {
        try {
          const response = await axios.post('http://localhost:5000/extract_rating_out', {
            input_string: "Women Empower"
          });
          setRat(response.data.res);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchRating();
    }, []);

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const response = await fetch('http://localhost:5000/organization/name', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: "Women Empower" }) // Provide the organization name here
                });
                if (!response.ok) {
                    throw new Error('Organization not found');
                }
                const data = await response.json();
                setOrganization(data);
                setError(null);
            } catch (error) {
                setError(error.message);
                setOrganization(null);
            }
        };

        fetchOrganization(); // Trigger the fetch on component mount
    },
     []);

    
    if (!organization) {
        return <div>Loading...</div>;
    }
    
    

  

    return (
        <div className='flex flex-col'>
            <div className=' text-center mt-24'>
                <p className='text-5xl'><b>{organization.Title}</b></p>
                <p className='text-xl mt-2'>Type: {organization.Types}</p>
            </div>
            <div className='flex flex-row justify-center mt-20'>
                <div className=''>
                    <img src={organization.Image_url} alt='#'></img>
                    <p>{organization.Locations}</p>
                </div>
                <div className='flex flex-col ml-40 justify-center'>
                    <div className='flex flex-row'>    
                        <div >
                            
                            <p className='text-gray-600 text-3xl '><b>{organization.Enployees}</b></p>
                            <p className=' text-gray-600'><b>Workers</b></p>
                        </div>
                        <div className='flex flex-col ml-10'>
                        <p className=' text-gray-600 text-3xl'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CEO:</p>
                        <p className='text-gray-600 text-3xl'>{organization.CEO}</p>
                        </div>
                    </div>
                    <div>
                        
                        <p className='text-gray-600 text-3xl pt-10'><b>145</b></p>
                        <p className=' text-gray-600 pb-10'><b>days ago</b></p>
                    </div>

                    <button className='border border-r-2 bg-orange-600  text-white text-3xl'>Book an Appointment</button>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className=' flex flex-col items-center text-length'>
                    <h className="text-4xl mt-20 mb-10"><b>About</b></h>
                    <p>{organization.About}</p>
                </div>
                <div className=' flex flex-col items-center'>
                    <p className="text-4xl mt-20 mb-10"><b>Financial Metrics</b></p>
                    <div className='flex flex-row'>
                    <div><GaugeChart
                        id="gauge-chart3"
                        nrOfLevels={30}
                        colors={["red", "green"]}
                        arcWidth={0.7}
                        percent={rat/10}
                        textColor='none'
                    />
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI based overall Rating of the Project</p>
                    </div>
                    <div>
                    <GaugeChart
                        id="gauge-chart3"
                        nrOfLevels={30}
                        colors={["red", "green"]}
                        arcWidth={0.7}
                        percent={organization.ROI}
                        textColor='none'
                    /><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        ROI(Return On Investment)</p>
                    </div>
                    </div>
                    
                </div>
                <div className='flex flex-col text-center'>
                    <h className="text-4xl mt-20 mb-10"><b>Impact Goals</b></h>
                    <p className='text-length'>{organization.Impact_Goals}</p>
                </div >
                <div className='flex flex-col text-center'>
                <h className="text-4xl mt-20 mb-10"><b>Team Expertise</b></h>
                    <p className='text-length'>{organization.Team_Expertise}</p>
                </div>
                <div className='flex flex-col text-center'>
                <h className="text-4xl mt-20 mb-10"><b>Stage</b></h>
                    <p>{organization.Stage}</p>
                </div>
            </div>
        </div>
    );
}

export default Women_Empower;
