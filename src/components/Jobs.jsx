import { useEffect, useState } from 'react';
import './jobs.css';
import { ShimmerThumbnail, ShimmerText } from "react-shimmer-effects";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  // Function to fetch jobs based on keyword
  const fetchJobs = async (keyword = "golang") => {
    setLoading(true);
    const url = `https://linkedin-data-api.p.rapidapi.com/search-jobs-v2?keywords=${keyword}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': import.meta.env.VITE_API_HOST
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setJobs(result.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch default jobs when component mounts
  }, []);
  
  // Handle search input and fetch new jobs
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchWord.trim() !== "") {
      fetchJobs(searchWord);
    }
  };

  return (
    <div className="jobs-container">
      <div className="upperDiv">
        <h1>Top Jobs for You</h1>
        <input type="search" 
        className='search-jobs' 
        placeholder='Search jobs...'
        value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleSearch} // Trigger search on Enter
        
        />
      </div>

      <div className="cards_div">
        {loading ? (
          // Show shimmer while loading
          [...Array(6)].map((_, index) => (
            <div className="job-card shimmer" key={index}>
              <ShimmerThumbnail height={80} width={80} />
              <ShimmerText line={2} gap={10} />
              <ShimmerText line={1} width={120} />
            </div>
          ))
        ) : jobs.length > 0 ? (
          // Show job data once loaded
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <img src={job.company?.logo || 'default-logo.png'} alt="Company Logo" className="company-logo" />
              <h2 className="job-title">{job.title}</h2>
              <p className="company-name">{job.company?.name}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
