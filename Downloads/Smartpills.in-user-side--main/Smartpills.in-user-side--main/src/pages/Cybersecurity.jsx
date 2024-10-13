import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const Cybersecurity=()=>{
    return(
        <>
        <Navbar/>
        <div className="mx-20 my-20">
        <div className="font-semibold text-2xl mb-8" style={{textAlign:'center'}}>Cyber Security</div>
        <div className="mb-5"><span className="font-semibold">SmartPills.in</span> has put in place technical and organizational measures to ensure that we maintain IT security across operations at <span className="font-semibold">SmartPills.in.</span> An overview of some of the technical and organizational measures <span className="font-semibold">SmartPills.in.</span> has implemented are listed below.</div>
        <div>
            <div className="font-semibold">GDPR</div>
            <div className="mb-5">As of May 25th, 2018, <span className="font-semibold">SmartPills.in.</span> is compliant with the India’s General Data Protection Regulations. <span className="font-semibold">SmartPills.in.</span> has undergone the appropriate measures to be compliant.</div>
        </div>
        <div>
            <div className="font-semibold">IT Security policies</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> has established written IT Security Policies to give guidance on various areas of IT Security. Further technical and organizational measures are contained in these policies, and they are based on best practice and international standards. These policies are regularly reviewed and consider, among other things, the state of the art and risks faced by <span className="font-semibold">SmartPills.in.</span> so as to provide adequate IT Security which protects against accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to personal data transmitted, stored or otherwise processed at <span className="font-semibold">SmartPills.in.</span></div>
        </div>
        <div>
            <div className="font-semibold">Vendor assessments</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> ensures a high level of IT Security across its operations by choosing vendors which can provide an otherwise equally high level of IT Security.</div>
        </div>
        <div>
            <div className="font-semibold">Encryption</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.’s</span> Cloud Computing storage is encrypted by default. The key management sovereignty is held within <span className="font-semibold">SmartPills.in.</span> and cannot be accessed by third parties. <span className="font-semibold">SmartPills.in.’s</span> workstations and laptops are encrypted to protect from data theft. Encryption and decryption are centrally managed by the IT Support Team.</div>
        </div>
        <div>
            <div className="font-semibold">Penetration testing</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> conducts penetration testing by third-party experts once a quarter throughout all customer-facing systems. Results and issues are logged, assessed, and are managed centrally by the Incident and Response Team.</div>
        </div>
        <div>
            <div className="font-semibold">Vulnerability disclosure program</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> offers a bug bounty program to attract hackers to find IT Security bugs in <span className="font-semibold">SmartPills.in.’s</span> products with the goal to continually improve the level of IT Security of <span className="font-semibold">SmartPills.in.</span> products. If you would like to participate in this program, please send an email to <span className="font-semibold"><Link to="mailto: info@smartpills.in">info@SmartPills.in.</Link></span></div>
        </div>
        <div>
            <div className="font-semibold">Firewalls</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> makes use of network segmentation supported by state-of-the-art firewall technologies for on-premise systems as well as cloud systems.</div>
        </div>
        <div>
            <div className="font-semibold">DDoS attack prevention</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> makes use of extensive services that prevent and mitigate DDoS attacks.</div>
        </div>
        <div>
            <div className="font-semibold">Pseudonymization or anonymization</div>
            <div className="mb-5">Where possible, <span className="font-semibold">SmartPills.in.</span> has automated pseudonymization or alternatively anonymization processes in systems handling personal data.</div>
        </div>
        <div>
            <div className="font-semibold">Access control</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> has processes and procedures for access control, including on- and offboarding of employees as well as granting, revoking, and reviewing user access rights. User access rights are centrally managed in the Active Directory. Every user retrieves a unique user account; shared user accounts are prohibited. Physical access controls are realized via ID-badges. The details of visitors to <span className="font-semibold">SmartPills.in.</span> offices are recorded, and visitors are provided with least-access ID-badges. Offices are supervised 24/7 by trained security personnel.</div>
        </div>
        <div>
            <div className="font-semibold">Need-to-know restrictions</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.’s</span> rights management system corresponds the Least-Privilege Access principle where users receive the least possible set of privileges on a computer system necessary to execute their responsibilities.</div>
        </div>
        <div>
            <div className="font-semibold">Segregation of duties</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.’s</span> software operation pipelines include the segregation of duties to effectively prevent software engineers from publishing and committing code changes without the review of colleagues. To further improve code quality, <span className="font-semibold">SmartPills.in.</span> implemented two testing stages prior to production environment. <span className="font-semibold">SmartPills.in.</span> user personal data is only available on production level systems and restricted to non-human access.</div>
        </div>
        <div>
            <div className="font-semibold">Awareness and training</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> continually trains its staff. Courses are updated regularly to cover individual learning objectives and <span className="font-semibold">SmartPills.in.</span> has compulsory baseline knowledge areas such as IT Security and Data Protection.</div>
        </div>
        <div>
            <div className="font-semibold">Confidentiality</div>
            <div className="mb-5">All contracts with <span className="font-semibold">SmartPills.in.</span> employees and freelancers working for <span className="font-semibold">SmartPills.in.</span> include confidentiality provisions. <span className="font-semibold">SmartPills.in.</span> makes extensive use of non-disclosure agreements to ensure that confidentiality is maintained when working with third parties.</div>
        </div>
        <div>
            <div className="font-semibold">Incident response</div>
            <div className="mb-5"><span className="font-semibold">SmartPills.in.</span> has an incident response team which consists of members from the following three organizational teams:<br></br>
            <ul>
                <li>• Legal Team and Data Protection Officer</li>
                <li>• IT Security Team </li>
                <li>• Incident Team All incident reports, penetration test results, and bug bounty submissions are centrally assessed, documented, tracked, and monitored. How to contact us We take IT Security seriously. If you have any additional questions that aren't answered above or by please email <span className="font-semibold"><Link to="mailto: info@smartpills.in">info@SmartPills.in.</Link></span> and we'll reply as quickly as we can.</li></ul></div>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Cybersecurity;