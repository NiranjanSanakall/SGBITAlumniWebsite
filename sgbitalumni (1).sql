-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2023 at 07:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sgbitalumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `activityID` int(11) NOT NULL,
  `activityName` varchar(35) NOT NULL,
  `resourcePerson` varchar(40) NOT NULL,
  `resourcePersonCompanyName` varchar(40) NOT NULL,
  `activityDate` date NOT NULL,
  `activityTime` time NOT NULL,
  `department` varchar(35) NOT NULL DEFAULT 'CSE',
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`activityID`, `activityName`, `resourcePerson`, `resourcePersonCompanyName`, `activityDate`, `activityTime`, `department`, `description`) VALUES
(8001, 'Hackthon', 'Basavraj', '', '2023-07-10', '13:52:40', 'CSE', ''),
(8002, 'codingNinja', 'Ravi', '', '2023-04-11', '13:55:17', 'CSE', ''),
(8003, 'Coding Ninjas', 'Basavraj', '', '2023-07-27', '17:43:00', 'CSE', ''),
(8004, 'Hackthon', 'Basavraj', '', '2023-08-04', '09:00:00', 'CSE', ''),
(8005, 'Resume Building', 'Ajith', 'Infosys', '2023-07-27', '09:00:00', 'CSE', ''),
(8006, 'Hackthon', 'Basavraj', 'infotech', '2023-07-29', '09:30:00', 'CSE', 'Improving Application Development Skills amongst the student'),
(8007, 'Hackthon3', 'Ajay', 'IBM', '2023-08-17', '09:30:00', 'CSE', 'hello world');

-- --------------------------------------------------------

--
-- Table structure for table `adminstrators`
--

CREATE TABLE `adminstrators` (
  `adminid` int(11) NOT NULL,
  `adminLogin` varchar(30) NOT NULL,
  `adminPassword` varchar(30) NOT NULL DEFAULT 'abc123^',
  `designation` varchar(35) NOT NULL,
  `department` varchar(30) NOT NULL DEFAULT 'Computer Science & Engineering'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `allimages`
--

CREATE TABLE `allimages` (
  `imageId` int(11) NOT NULL,
  `activityImgUrl` varchar(50) NOT NULL,
  `imgDescription` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allimages`
--

INSERT INTO `allimages` (`imageId`, `activityImgUrl`, `imgDescription`) VALUES
(4000, '../AllImgs/4000photo.png', 'drone'),
(4020, '../AllImgs/4001photo.png', 'cc logo'),
(4021, '../AllImgs/4021photo.jpg', 'car'),
(4022, '../AllImgs/4022photo.jpg', 'car2'),
(4023, '../AllImgs/4023photo.webp', 'car3'),
(4024, '../AllImgs/4024photo.jpg', 'car4');

-- --------------------------------------------------------

--
-- Table structure for table `alumnicompanies`
--

CREATE TABLE `alumnicompanies` (
  `alumniID` int(11) NOT NULL,
  `companyName` varchar(40) NOT NULL,
  `countryName` varchar(30) NOT NULL,
  `city` int(11) NOT NULL,
  `yearOfJoining` int(11) NOT NULL,
  `yearOfLeaving` int(11) NOT NULL,
  `domainExpertise` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumniday`
--

CREATE TABLE `alumniday` (
  `aid` int(11) NOT NULL,
  `aDate` date NOT NULL,
  `aTime` varchar(20) NOT NULL,
  `aVenue` varchar(50) NOT NULL,
  `branchName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumniday`
--

INSERT INTO `alumniday` (`aid`, `aDate`, `aTime`, `aVenue`, `branchName`) VALUES
(11, '2023-09-06', '09:30', 'SGBIT Auditorium', 'INSTITUTE'),
(12, '2023-08-02', '09:30', 'SGBIT Auditorium', 'CSE'),
(13, '2023-12-20', '09:30', 'SGBIT Auditorium', 'ECE'),
(14, '2023-11-01', '10:30', 'SGBIT Auditorium', 'EEE'),
(15, '2023-08-25', '09:30', 'SGBIT Auditorium', 'CSE'),
(16, '2023-09-21', '09:30', 'SGBIT Auditorium', 'INSTITUTE');

-- --------------------------------------------------------

--
-- Table structure for table `alumniposts`
--

CREATE TABLE `alumniposts` (
  `postId` int(11) NOT NULL,
  `post` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `department` varchar(10) NOT NULL,
  `topic` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `counter` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumniposts`
--

INSERT INTO `alumniposts` (`postId`, `post`, `date`, `department`, `topic`, `username`, `counter`) VALUES
(7000, 'Improving Quality of Education is nessary ', '2023-07-20', 'ECE', 'Improving Qulity Of Education', 'Niranjan', 46),
(7002, 'Skill development is nessecery', '2023-07-28', 'CSE', 'Student Skill Development', '8123063662', 4),
(7003, 'Hello world', '2023-07-28', 'CSE', 'Improving Qulity Of Education', 'Niranjan', 3),
(7004, 'My Post', '2023-07-28', 'CSE', 'Student Skill Development', 'Niranjan', 2),
(7005, 'hello', '2023-07-28', 'CSE', 'Student Skill Development', 'Rakesh', 2);

-- --------------------------------------------------------

--
-- Table structure for table `alumnistudent`
--

CREATE TABLE `alumnistudent` (
  `alumniID` int(11) NOT NULL,
  `fname` varchar(35) NOT NULL,
  `lname` varchar(35) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `yearOfPassing` int(11) NOT NULL,
  `cellNum` char(10) NOT NULL,
  `emailid` varchar(40) NOT NULL,
  `presentlyworkingAtCompany` varchar(100) NOT NULL,
  `branchName` varchar(30) NOT NULL,
  `city` varchar(35) NOT NULL,
  `imageURL` varchar(60) NOT NULL,
  `domainExpertise` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL DEFAULT 'GM',
  `login` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `approvalStatus` varchar(25) NOT NULL DEFAULT 'Pending',
  `type` varchar(20) NOT NULL DEFAULT 'alumni',
  `numLectGiven` int(11) NOT NULL DEFAULT 0,
  `numInternGot` int(11) NOT NULL DEFAULT 0,
  `numPlacementsGot` int(11) NOT NULL DEFAULT 0,
  `amountDonated` float NOT NULL DEFAULT 0,
  `alumniPerformanceIndex` float NOT NULL DEFAULT 0,
  `professionPoints` int(11) NOT NULL,
  `awardPoints` int(11) NOT NULL,
  `chromePassword` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumnistudent`
--

INSERT INTO `alumnistudent` (`alumniID`, `fname`, `lname`, `gender`, `yearOfPassing`, `cellNum`, `emailid`, `presentlyworkingAtCompany`, `branchName`, `city`, `imageURL`, `domainExpertise`, `category`, `login`, `password`, `approvalStatus`, `type`, `numLectGiven`, `numInternGot`, `numPlacementsGot`, `amountDonated`, `alumniPerformanceIndex`, `professionPoints`, `awardPoints`, `chromePassword`) VALUES
(1000, 'Niranjan', 'Sankal', 'M', 2022, '8123063662', 'sfroddjforkts@gmail.com', 'Wipro', 'CSE', 'Bengaluru', '../AlumniImages/1006Photo.jpeg', 'Data Analysis', 'OBC', 'abc', 'abc123^', 'Approved', 'alumni', 6, 10, 4, 25000, 240, 0, 0, ''),
(1002, 'Niranjan', 'Sanakall', '', 2016, '8123456789', 'niranjansanakall@gmail.com', 'microsoft', 'CSE', 'Bengaluru', '../AlumniImages/1006Photo.png', 'Java Programming', 'GM', 'Niranjan', '5555', 'Approved', 'alumni', 2, 1, 1, 20000, 100, 0, 0, ''),
(1005, 'Rakshith', 'P V', 'M', 2025, '9518524560', 'niranjansanakall@gmail.com', 'Infosys', 'CSE', 'Bengaluru', '../AlumniImages/1010photo.png', 'App development', 'Minority', 'Rakshith', 'abc123', 'Approved', 'alumni', 29, 30, 31, 85903, 2345, 180, 100, ''),
(1009, 'Suresh ', 'B.', 'M', 2023, '555', 'hodece@gmail.com', 'ece', 'ECE', 'Pune', '../AlumniImages/ma.jpeg', 'none', 'GM', 'ecehod', '@123', 'Approved', 'Faculty', 0, 0, 0, 0, 0, 0, 0, ''),
(1016, 'B. S', 'halkarnimatt', 'M', 2023, '8452', 'basaprabhush@sgbit.edu.in', 'wiproo', 'CSE', 'Mumbai', '../AlumniImages/.jpeg', 'Java programing', 'GM', 'csehod', '@123', 'Approved', 'Faculty', 2, 3, 1, 52000, 150, 0, 0, ''),
(1030, 'B. S', 'Patagundi', 'M', 2008, '5165500000', 'abc@gmail.com', '', '', '', '../AlumniImages/.jpeg', '', 'GM', 'principal', '@123', 'Approved', 'Principal', 0, 0, 0, 0, 0, 0, 0, ''),
(1034, 'Prakash', 'kamkar', 'M', 2024, '455522333', 'pgkamkarpk@gmail.com', 'Google', 'CSE', 'Chennai', '../AlumniImages/1033photo', 'Java programing', 'ST', 'Prakash', '8888', 'Approved', 'alumni', 8, 10, 8, 86020, 7130, 200, 260, ''),
(1054, 'Sharanabasappa', 'Zampa', '', 2023, '9880633681', 'sharanbasappa.z@sgbit.edu.in', 'Prof. in Mechanical Engg. SGBIT', 'INSTITUTE', 'Belgaum', '../AlumniImages/1053photo', 'Design Of Machines', 'OBC', 'alcord', '@123', 'Approved', 'Coordinator', 0, 0, 0, 0, 0, 0, 0, ''),
(1081, 'Supanna S', 'Shirguppe', 'F', 2013, '0000011111', 'abc@gmail.com', '', 'EEE', '', '../AlumniImages/.jpeg', '', 'GM', 'eeehod', '@123', 'Pending', 'Faculty', 0, 0, 0, 0, 0, 0, 0, ''),
(1082, 'R. M.', 'Galagali', 'M', 2010, '1234567890', 'abc@gmail.com', '', 'MECH', '', '../AlumniImages/.jpeg', '', 'GM', 'mechhod', '@123', 'Pending', 'Faculty', 0, 0, 0, 0, 0, 0, 0, ''),
(1083, 'K. B.', 'Prakash', 'M', 2012, '1234506987', 'abc@gmail.com', '', 'CIVIL', '', '../AlumniImages/.jpeg', '', 'GM', 'civilhod', '@123', 'Pending', 'Faculty', 0, 0, 0, 0, 0, 0, 0, ''),
(1084, 'xyx', 'ss', 'F', 2022, '5555', '@gmail.com', '', 'AIDS', '', '../AlumniImages/1099photo.jpeg', '', 'GM', 'aidshod', '@123', 'Pending', 'Faculty', 0, 0, 0, 0, 0, 0, 0, ''),
(1085, 'Rakesh', 'Shetty', 'M', 2025, '9851291254', 'abc@gmail.com', 'abc', 'CSE', 'Bengaluru', '../AlumniImages/1085photo.png', 'Java Programming', 'OBC', '12345', '1234', 'Approved', 'alumni', 2, 2, 3, 80, 400, 90, 50, ''),
(1087, 'Ramesh', 'Sharma', 'M', 2022, '9851222201', 'ramesh@gmail.com', 'Microsoft', 'ECE', 'Belgaum', '../AlumniImages/1086photo.png', 'Web Technology', 'OBC', 'ramesh', '111', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1088, 'Rohan', 'Kaktikar', 'M', 2023, '9851255555', 'rohan@gmail.com', 'Infosys', 'CIVIL', 'Delhi', '../AlumniImages/1088photo.png', 'C programing', 'ST', 'rohan', '111', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1089, 'Shreya', 'Shetty', 'F', 2023, '9851233521', 'shreya@gmail.com', 'Google', 'MECH', 'Pune', '../AlumniImages/1089photo.png', 'Python programing', 'Minority', 'shreya', '111', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1090, 'Kalmesh', 'Sharma', 'M', 2014, '9851211112', 'kalmesh@gmail.com', 'Infotech', 'CIVIL', 'Chennai', '../AlumniImages/1090photo.png', 'App development', 'GM', 'kalmesh', '111', 'Pending', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1091, 'Mahesh', 'Shetty', 'M', 2015, '9851222001', 'mahesh@gmail.com', 'Microsoft', 'EEE', 'Pune', '../AlumniImages/1091photo.png', 'App development', 'OBC', 'mahe', '111', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1092, 'abc', 'abc', 'M', 2021, '98512', 'abc@gmail.com', 'abc', 'MECH', 'Chennai', '../AlumniImages/1092photo.png', 'machine learning', 'ST', 'ml', '000', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1093, 'abc', 'abc', 'M', 2016, '9851200000', 'abc@gmail.com', 'abc', 'CSE', 'Chennai', '../AlumniImages/1093photo.png', 'AI', 'OBC', 'ai', '000', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1094, 'abc', 'abc', 'F', 2018, '98512', 'abc@gmail.com', 'abc', 'EEE', 'Pune', '../AlumniImages/1094photo.png', 'AIML', 'ST', 'aiml', '000', 'Approved', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1095, 'adminLogin', 'none', 'M', 2023, '2323236363', 'admingmail.com', 'unknown', 'ECE', 'Pune', '../AlumniImages/mango.png', 'none', 'GM', 'admin', '@123', 'Pending', 'alumni', 0, 0, 0, 0, 0, 0, 0, ''),
(1096, 'csbsHod', '', 'M', 2023, '2323236363', 'csbs@gmail.com', '', 'CSBS', '', '', '', 'GM', 'csbshod', '@123', 'Approved', 'Faculty', 0, 0, 0, 0, 0, 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `alumniworkhistory`
--

CREATE TABLE `alumniworkhistory` (
  `alumniID` int(11) NOT NULL,
  `companyName` varchar(40) NOT NULL,
  `city` varchar(30) NOT NULL,
  `stYear` int(11) NOT NULL,
  `enYear` int(11) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `workDomain` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumniworkhistory`
--

INSERT INTO `alumniworkhistory` (`alumniID`, `companyName`, `city`, `stYear`, `enYear`, `designation`, `workDomain`) VALUES
(1001, 'Infotech', 'Pune', 2020, 2022, 'Asst. Product Manager', 'Bussiness Analytics'),
(1002, 'microsoft', 'Bengaluru', 2020, 2023, 'Manager', 'Selling'),
(1005, 'Infosys', 'Banglore', 2019, 2022, 'Developer', 'Web Technology'),
(1002, 'microsoft', 'bengaluru', 2019, 2022, 'CEO', 'c programmer'),
(1002, 'Google', 'Chennai', 2014, 2016, 'Designer', 'Architect'),
(1002, 'Google', 'Chennai', 2012, 2018, 'Project Leader', 'App development'),
(1002, 'Infosys', 'Bengaluru', 2014, 2019, 'Other', 'Java programing'),
(1002, '', 'Choose Your Worked City', 0, 0, 'Choose Designation', 'Choose Your Expertise');

-- --------------------------------------------------------

--
-- Table structure for table `arrangeplacements`
--

CREATE TABLE `arrangeplacements` (
  `placementId` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `organization` varchar(30) NOT NULL,
  `numOfOpenings` varchar(30) NOT NULL,
  `eligibility` varchar(30) NOT NULL,
  `prerequisites` varchar(30) NOT NULL,
  `package` varchar(30) NOT NULL,
  `targetAudience` varchar(50) NOT NULL,
  `zdate` varchar(30) NOT NULL,
  `emailId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `arrangeplacements`
--

INSERT INTO `arrangeplacements` (`placementId`, `fname`, `lname`, `organization`, `numOfOpenings`, `eligibility`, `prerequisites`, `package`, `targetAudience`, `zdate`, `emailId`) VALUES
(6000, 'Niranjan', 'Sanakall', 'Infotech', '1-20', '8.5', 'c java', '3.5', '(\'EEE\')', '', ''),
(6001, 'Niranjan', 'Sanakall', 'dhcbh', '1-15', 'jnc', 'dujc', 'kdn', '(\'CSE\')', '2023-08-02 12:51:02.886', ''),
(6002, 'Rakshith', 'P V', 'jnk', '1-20', ',jhi', 'juhuy', 'kjuhiu', '(\'EEE\')', '2023-08-02 21:04:41.693', ''),
(6003, 'Niranjan', 'Sanakall', 'JForkTS', '1-35', '7.5 cgpa', 'Web Technology', '4.5 lackh', '(\'CSE\',\'EEE\')', '2023-08-04 16:05:00.026', 'niranjansanakall@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `departmentName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departmentName`) VALUES
('CSE'),
('ECE'),
('EEE'),
('AIDS'),
('CIVIL'),
('MECH'),
('CSBS'),
('Principal'),
('Admin'),
('Alumni Co-ordinator');

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `domainName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`domainName`) VALUES
('Java Programming'),
('C Programming'),
('Web Development'),
('App development'),
('Data Analysis'),
('AIML');

-- --------------------------------------------------------

--
-- Table structure for table `experttalk`
--

CREATE TABLE `experttalk` (
  `messageId` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `subject` varchar(60) NOT NULL,
  `message` varchar(200) NOT NULL,
  `targetAudience` varchar(50) NOT NULL,
  `ydate` varchar(30) NOT NULL,
  `emailId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experttalk`
--

INSERT INTO `experttalk` (`messageId`, `fname`, `lname`, `subject`, `message`, `targetAudience`, `ydate`, `emailId`) VALUES
(5000, 'Niranjan', 'Sanakall', 'Expert Talk', 'Hello', '(\'CSE\',\'CIVIL\')', '', ''),
(5006, 'Niranjan', 'Sanakall', 'khbd', 'kjdch', 'All', '', ''),
(5007, 'Niranjan', 'Sanakall', 'nsja', 'uhsi', '(\'CSE\')', '2023-08-02 12:24:44.863', ''),
(5008, 'Rakshith', 'P V', 'mvhg', 'gvhv', '(\'CSBS\')', '2023-08-02 21:03:39.177', ''),
(5009, 'Niranjan', 'Sanakall', 'Full Stack', 'Students are expected to lern web frameworks such as node.js, react.js etc', '(\'CSE\',\'AIDS\',\'CSBS\')', '2023-08-04 16:03:15.916', 'niranjansanakall@gmail.com'),
(5010, 'Niranjan', 'Sanakall', 'Talk on Git and GitHub', 'Version control system widely used in IT industry for collaborative software development.', '(\'CSE\',\'AIDS\',\'CSBS\')', '2023-08-04 17:33:03.911', 'niranjansanakall@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `provideinternship`
--

CREATE TABLE `provideinternship` (
  `internshipId` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `organization` varchar(30) NOT NULL,
  `numOfInterns` varchar(30) NOT NULL,
  `stipendAvailability` varchar(20) NOT NULL,
  `prerequisites` varchar(40) NOT NULL,
  `duration` varchar(30) NOT NULL,
  `targetAudience` varchar(50) NOT NULL,
  `xdate` varchar(30) NOT NULL,
  `emailId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provideinternship`
--

INSERT INTO `provideinternship` (`internshipId`, `fname`, `lname`, `organization`, `numOfInterns`, `stipendAvailability`, `prerequisites`, `duration`, `targetAudience`, `xdate`, `emailId`) VALUES
(2000, 'Niranjan', 'Sanakall', 'Infotech', '1-15', 'No', 'c, java', '4 weeks', '(\'CSE\',\'ECE\')', '', ''),
(2001, 'Niranjan', 'Sanakall', 'shn', '1-15', 'No', 'jdbcd', 'jkjdbc', '(\'CSE\')', '2023-08-02 12:50:22.846', ''),
(2002, 'Rakshith', 'P V', 'ngvhg', '1-20', 'No', 'ug7', 'nugb', '(\'MECH\')', '2023-08-02 21:04:13.113', ''),
(2003, 'Rakshith', 'P V', 'Infosys', '1-10', 'No', 'C, Java etc', '4 weeks', '(\'CSE\')', '2023-08-04 15:06:57.714', ''),
(2004, 'Rakshith', 'P V', 'Google', '1-20', 'No', 'C, Python', '8 weeks', '(\'ECE\',\'MECH\')', '2023-08-04 15:09:12.848', ''),
(2005, 'Rakshith', 'P V', 'Microsoft', '1-25', 'No', 'Java, web-Technology', '8 weeks', '(\'EEE\',\'MECH\')', '2023-08-04 15:15:35.854', ''),
(2006, 'Rakesh', 'Shetty', 'Infotech', '1-35', 'No', 'Java, DSA', '4 weeks', '(\'ECE\',\'CSE\')', '2023-08-04 15:20:09.320', ''),
(2007, 'Niranjan', 'Sankal', 'wiproo', '1-15', 'No', 'C, Java', '4 weeks', '(\'CSE\',\'ECE\')', '2023-08-04 15:26:08.080', ''),
(2008, 'Niranjan', 'Sanakall', 'Infotech', '1-15', 'No', 'c, Java', '4 weeks', '(\'ECE\')', '2023-08-04 15:40:36.278', 'niranjansanakall@gmail.com'),
(2009, 'Niranjan', 'Sanakall', 'Google', '1-25', 'No', 'C, Java', '4 weeks', '(\'EEE\',\'CSE\')', '2023-08-04 16:04:01.681', 'niranjansanakall@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activityID`);

--
-- Indexes for table `adminstrators`
--
ALTER TABLE `adminstrators`
  ADD PRIMARY KEY (`adminid`);

--
-- Indexes for table `allimages`
--
ALTER TABLE `allimages`
  ADD PRIMARY KEY (`imageId`);

--
-- Indexes for table `alumniday`
--
ALTER TABLE `alumniday`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `alumniposts`
--
ALTER TABLE `alumniposts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `alumnistudent`
--
ALTER TABLE `alumnistudent`
  ADD PRIMARY KEY (`alumniID`);

--
-- Indexes for table `arrangeplacements`
--
ALTER TABLE `arrangeplacements`
  ADD PRIMARY KEY (`placementId`);

--
-- Indexes for table `experttalk`
--
ALTER TABLE `experttalk`
  ADD PRIMARY KEY (`messageId`);

--
-- Indexes for table `provideinternship`
--
ALTER TABLE `provideinternship`
  ADD PRIMARY KEY (`internshipId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8008;

--
-- AUTO_INCREMENT for table `adminstrators`
--
ALTER TABLE `adminstrators`
  MODIFY `adminid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `allimages`
--
ALTER TABLE `allimages`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4025;

--
-- AUTO_INCREMENT for table `alumniday`
--
ALTER TABLE `alumniday`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumniposts`
--
ALTER TABLE `alumniposts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7008;

--
-- AUTO_INCREMENT for table `alumnistudent`
--
ALTER TABLE `alumnistudent`
  MODIFY `alumniID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1097;

--
-- AUTO_INCREMENT for table `arrangeplacements`
--
ALTER TABLE `arrangeplacements`
  MODIFY `placementId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6004;

--
-- AUTO_INCREMENT for table `experttalk`
--
ALTER TABLE `experttalk`
  MODIFY `messageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5011;

--
-- AUTO_INCREMENT for table `provideinternship`
--
ALTER TABLE `provideinternship`
  MODIFY `internshipId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2010;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
