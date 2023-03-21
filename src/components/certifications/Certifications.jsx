import React from 'react'
import './certifications.css'
import IMG1 from '../../assets/pca.png'
import IMG2 from '../../assets/ace.png'
import IMG3 from '../../assets/az900.png'
import { BsPatchCheckFill } from 'react-icons/bs'
import { HiExternalLink } from 'react-icons/hi'


const data = [
    {
        title: "Google Cloud Certified Professional Cloud Architect",
        docUrl:"https://cloud.google.com/certification/cloud-architect/?userloc_9061862-network_g",
        image: IMG1,
        time: "Jan 2023",
        expiry: "Jan 2025",
        Id: "8fHaXo",
        url: "https://www.credential.net/9aea7dd8-d5cd-4f2e-be63-2ad89c41094e?key=52d7eb4ee4e65d14ad8f6130e3491de45fe6ea46d9840cc126f98cb6325d9f85#gs.nb9l40"
    },
    {
        title: "Google Cloud Certified Associate Cloud Engineer",
        docUrl:"https://cloud.google.com/certification/cloud-engineer",
        image: IMG2,
        time: "Oct 2022",
        expiry: "Oct 2025",
        Id: "60698263",
        url: "https://www.credential.net/5924425b-2751-4cc2-91b0-87813c028790"
    },
    {
        title: "Microsoft Certified: Azure Fundamentals",
        docUrl:"https://learn.microsoft.com/en-us/certifications/exams/az-900/",
        image: IMG3,
        time: "June 2022",
        expiry:"None",
        Id: "288236bc-8735-4358-b522-824c92885118",
        url: "https://www.credly.com/badges/da9c5793-ec36-44f8-ab0c-46ed871a391b"
    }
]
const Certifications = () => {
    return (
        <section id='certifications'>
            <h5>What certifications I have</h5>
            <h2>My certifications</h2>
            <div className="container certifications__container">
                {
                    data.map(({title, docUrl, image, time, expiry, Id, url}) => {
                        return (

                            <div className="certifications__div">

                                <img src={image} alt={"GCP_PCA"} className="certification_img" />

                                <div className="certifications__content">
                                    <a href={docUrl}><h3>{title}<HiExternalLink/></h3></a>
                                    {expiry=="None"? (<small>Isuued {time}</small>):
                                    (<small>Isuued {time} . Expires {expiry}</small>)
                                    }
                                    <small>Credential ID: {Id}</small>
                                    <a href={url} target="blank"><div><small>Credential Url <HiExternalLink/> </small></div></a>
                                </div>
                            </div>

                        )
                    })
                }
            </div>

        </section>
    )
}

export default Certifications