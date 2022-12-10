Date.prototype.compareTo = function (that) { return this.valueOf() - that.valueOf() }
Number.prototype.orIfZero = function (callback) { return this != 0 ? this : callback() }

class CVData {
	static populateData() {
		// Personal Info
		const personalInfo = this.personalInfo();
		document.getElementById("name").innerHTML = personalInfo.name;
		document.getElementById("email").innerHTML = personalInfo.email;
		document.getElementById("email-link").href = `mailto:${personalInfo.email}`;
		document.getElementById("cover").innerHTML = personalInfo.cover.join("<br/>");

		// Work History
		const workHistory = this.workHistory();
		if (workHistory != null) {
			const workList = document.getElementById("work-history");
			const template = document.getElementById("template-histitem").innerHTML;
			const period = template.match(/(.*)\$\{litem-when\}(.*)/);

			workHistory.sort((a, b) => b.periods[0]['end'].compareTo(a.periods[0]['end']).orIfZero(() => b.periods[0]['start'].compareTo(a.periods[0]['start'])));

			const collection = [];
			for (const item of workHistory) {
				const element = template
					.replace("${prop-title}", item.title)
					.replace("${prop-comment}", item.comment);

				item.periods.sort((a, b) => b.start.valueOf() - a.start.valueOf());
				let whenString = "";
				for (const p of item.periods) {
					whenString += `${period[1]}${p['name']}${period[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-when\}.*/, whenString));
			}

			const tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			workList.appendChild(tm.content);
		} else {
			document.getElementById("work-history").remove();
		}

		// Education
		const education = this.education();
		if (education != null) {
			const educationList = document.getElementById("education");
			const template = document.getElementById("template-histitem").innerHTML;
			const period = template.match(/(.*)\$\{litem-when\}(.*)/);

			education.sort((a, b) => b.periods[0]['end'].compareTo(a.periods[0]['end']).orIfZero(() => b.periods[0]['start'].compareTo(a.periods[0]['start'])));

			const collection = [];
			for (const item of education) {
				const element = template
					.replace("${prop-title}", item.title)
					.replace("${prop-comment}", item.comment);

				item.periods.sort((a, b) => b.start.valueOf() - a.start.valueOf());
				let periodString = "";
				for (const p of item.periods) {
					periodString += `${period[1]}${p['name']}${period[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-when\}.*/, periodString));
			}

			const tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			educationList.appendChild(tm.content);
		} else {
			document.getElementById("education").remove();
		}

		// Skills
		const skills = this.skills();
		if (skills != null) {
			const skillList = document.getElementById("skills");
			const template = document.getElementById("template-skillitem").innerHTML;
			const items = template.match(/(.*)\$\{litem-item\}(.*)/);

			const collection = [];
			for (const skill of skills) {
				const element = template
					.replace("${prop-title}", skill.title);

				let itemString = "";
				for (const item of skill['items']) {
					itemString += `${items[1]}${item}${items[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-item\}.*/, itemString));
			}

			const tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			skillList.appendChild(tm.content);
		} else {
			document.getElementById("skills").remove();
		}

		// Interests
		const interests = this.interests();
		if (interests != null) {
			const interestList = document.getElementById("interests").children.item(1);
			const template = document.getElementById("template-interestitem").innerHTML;
			const items = template.match(/(.*)\$\{litem-interest\}(.*)/);

			let itemString = "";
			for (const item of interests) {
				itemString += `${items[1]}${item}${items[2]}`;
			}
			interestList.innerHTML = itemString;
		} else {
			document.getElementById("interests").remove();
		}

		// Downloads
		const downloads = this.downloads();
		if (downloads != null) {
			const downloadList = document.getElementById("downloads").children.item(1);
			const template = document.getElementById("template-downloaditem").innerHTML;

			const collection = [];
			for (const download of downloads) {
				const element = template
					.replace(/\$\{prop-name\}/g, download.name)
					.replace("${prop-thumb}", download.thumb)
					.replace("${prop-href}", download.href);
				collection.push(element);
			}

			const tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			downloadList.appendChild(tm.content);
		} else {
			document.getElementById("downloads").remove();
		}
	}

	static personalInfo() {
		return {
			"name": "Francois Snyman",
			"email": "hello@fjsnyman.co.za",
			"cover": [
				"I am a software developer with experience across various programming languages and software development tools, currently specialising in Java Spring microservices and Kubernetes infrastructure management.",
				"I love learning new skills to empower myself, my team and my users in facing the latest and greatest challenges before us.",
			],
		};
	}

	// Fetch work history - ignored if null
	static workHistory() {
		return [
			{
				"periods": [{
					"start": new Date("2021-01-18"),
					"end": new Date(),
					"name": "2021 - Present",
				}],
				"title": "Java Developer at Kwaden Software Development",
				"comment": "I design and develop microservices and APIs using Spring Boot (Java) using MySQL, AMQ with RabbitMQ, IAC with Kubernetes, and CICD with Jenkins and GitHub Actions. Daily tasks include project management with Jira and Confluence, writing Bash or Powershell scripts, log monitoring and diagnostics, and server management using Rancher, Portainer, Kubectl, or SSH.<br/>I have researched, presented and implemented several projects integrating new techniques and technologies into our existing processes and systems. Projects were presented to directors and technical managers, then I was assigned to lead the project's implementation, task delegation and collaboration efforts with other departments.",
			},
			{
				"periods": [{
					"start": new Date("2020-05-01"),
					"end": new Date("2020-10-15"),
					"name": "2020",
				}],
				"title": "Integration Developer at Truckin-IT",
				"comment": "I co-developed the mobile app for a start-up shipping and logistics management solution with automated load-sharing and driver route optimisation. I primarily developed the mobile app's internal functionality for network interactions including remote calls (RESTful API calls, response caching and batching) and promise-based middleware to improve front-end developer experience.",
			},
			{
				"periods": [{
					"start": new Date("2020-03-09"),
					"end": new Date("2020-06-31"),
					"name": "2020",
				}],
				"title": "Integration Developer for large-team university project",
				"comment": "I acted as lead developer for an AI-driven speech-to-image mobile app, managing development of the core engine, network controllers, and unit testing.<br/>I handled project management for over 40 peers in various sub-teams, leading inter-group communication and conflict management, managing Git repositories and access control, and configuring project management tools.",
			},
			{
				"periods": [{
					"start": new Date("2020-02-01"),
					"end": new Date("2020-11-30"),
					"name": "2020",
				}],
				"title": "Full-Stack Developer at ARCRA",
				"comment": "I co-developed a standalone proof-of-concept Android app for a music radio service using Dart & Flutter. My main role was to design and develop internal functionality that UI elements could easily integrate with, such as the audio playback engine and song metadata service.",
			},
			{
				"periods": [{
					"start": new Date("2019-03-01"),
					"end": new Date("2020-11-30"),
					"name": "2019 - 2020",
				}],
				"title": "Full-Stack Developer at TuksFM Radio",
				"comment": "I developed a lightweight API piggybacking off an existing Wordpress instance (PHP & MySQL), and developed client-side integration functionality for the matching music radio app for Android (Dart & Flutter).",
			},
			{
				"periods": [
					{
						"start": new Date("2019-11-21"),
						"end": new Date("2019-12-21"),
						"name": "2019 (Dec)",
					},
					{
						"start": new Date("2018-11-21"),
						"end": new Date("2018-12-21"),
						"name": "2018 (Dec)",
					},
				],
				"title": "Holiday Intern at Kwaden Software Development",
				"comment": "I worked with the development team during holiday periods (when possible between university study terms) to gain experience working with a small, diverse team using process-driven development and CI/CD. I was exposed to the use of Java Spring Boot for web services with tightly integrated front-ends using JS, HTML, CSS, and the Kendo-UI component library.",
			},
			{
				"periods": [{
					"start": new Date("2017-06-01"),
					"end": new Date("2017-12-31"),
					"name": "2017",
				}],
				"title": "Full-Time Intern & Junior Developer at FirstView Media",
				"comment": "I developed full-stack applications using PHP & MySQL for RESTful web services, and used JavaScript (JQuery), HTML & CSS for client-facing web applications.<br/>I was later allowed to take lead on a collaborative project with a corporate client, which included liaising direct with their management. Tasks included the aggregation and collation of large legacy data sets (several ~400GiB databases) and management of scheduled tasks to interact with highly sensitive off-site systems for third-party clients.",
			},
		];
	}

	// Fetch education - ignored if null
	static education() {
		return [
			{
				"periods": [{
					"start": new Date("2021-03-18"),
					"end": new Date("2021-05-26"),
					"name": "Early 2021"
				}],
				"title": "Received accolades from University of Pretoria",
				"comment": "Received several awards during graduation and award ceremonies:<ul><li>graduated with distinction (75.2% aggregate)</li><li>2nd runner-up for top achiever in BSc Computer Science</li><li>industry project group winner for 'Best Architectural Awareness' and 'Software Engineering Excellence'</li></ul>"
			},
			{
				"periods": [{
					"start": new Date("2018-01-01"),
					"end": new Date("2020-12-31"),
					"name": "2018 - 2020",
				}],
				"title": "Completed BSc Computer Science degree with distinction at University of Pretoria",
				"comment": "Learned invaluable skills in software engineering, mathematics, and time- and stress-management at one of South Africa's most highly rated Computer Science departments. Major categories covered include discrete mathematics, data structures & algorithms, design patterns, operating systems, compiler construction, and graphics programming.",
			},
			{
				"periods": [{
					"start": new Date("2012-01-01"),
					"end": new Date("2016-12-31"),
					"name": "2016",
				}],
				"title": "Achieved South African National Senior Certificate (IEB)",
				"comment": "Attended Thomas More College (Kloof, KwaZulu-Natal, ZA)<br/><ul><li>Core Mathematics - 96% | Information Technology - 94%</li><li>Finalist (Top 20 in SA) in South African Computing Olympiad 2016</li><li>Qualified for Mathematics Olympiad round 3 (semi-final) 2015</li></ul>",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end": new Date("2016-11-01"),
					"name": "2016",
				}],
				"title": "Granted Student Membership to IITPSA (Institute of IT Professionals SA)",
				"comment": "Invited to join the institute to commemorate finalist placement in the South African Computing Olympiad 2016.",
			},
		];
	}

	// Fetch personal skills - ignored if null
	static skills() {
		return [
			{
				"title": "Software Development",
				"items": [
					"Highly proficient with industry-standard development tools such as Bash, Docker and Git.",
					"Highly experienced with REST and GraphQL API architectures.",
					"Experienced building software from the ground up, and usings frameworks like Spring Boot and Flutter.",
					"Experienced with IAC and CICD using Kubernetes and GitHub Actions.",
				],
			},
			{
				"title": "Programming Languages",
				"items": [
					"High proficiency with Java SE, Dart, SQL, and Bash Scripting.",
					"Moderate proficiency with HTML, CSS, native JS, and PHP.",
					"Basic proficiency with Golang, Python, C++ 17, native C, x86-64 assembly (NASM/YASM).",
				],
			},
			{
				"title": "Organisation & Leadership",
				"items": [
					"Experience as the lead developer and primary point of contact for multiple ongoing and legacy projects simultaneously.",
					"Experience managing task assignment and facilitating communication in small and large teams with a flat hierarchy.",
					"Experience with project management tools and continuous integration systems.",
				],
			},
			{
				"title": "Communication",
				"items": [
					"Can clearly present and discuss development goals and concepts at various levels of complexity and transparency as needed, be it to expert developers to clients with minimal technical knowledge.",
					"Able to maintain clear, calm discussion when experiencing confusion or stubbornnes with others.",
					"Quick to build and maintain strong relationships with coworkers, leaders and clients.",
					"Can establish and maintain vision of short- and long-term goals for a project.",
				],
			},
		];
	}

	// Fetch personal interests - ignored if null
	static interests() {
		return [
			"Software engineering and research",
			"Digital artistry and photography",
			"Woodwork and home improvement",
			"Designing, developing, and playing video games",
		];
	}

	// Fetch downloadable attachments - ignored if null
	static downloads() {
		return [
			{
				"name": "UP Academic Record",
				"thumb": "thumbs/tuks.jpg",
				"href": "downloads/annex/up_academic_record_2020.pdf",
			},
			{
				"name": "IITPSA Membership",
				"thumb": "thumbs/iitpsa.jpg",
				"href": "downloads/annex/iitpsa_membership_2016.pdf",
			},
			{
				"name": "IT Olympiad Certificate",
				"thumb": "thumbs/olympiad.jpg",
				"href": "downloads/annex/it_olympiad_2016.pdf",
			},
			{
				"name": "NSC",
				"thumb": "thumbs/ieb.jpg",
				"href": "downloads/annex/nsc_2016.pdf",
			},
			{
				"name": "TMC Testemonial",
				"thumb": "thumbs/tmc.jpg",
				"href": "downloads/annex/testemonial_tmc_2016.pdf",
			}
		];
	}
}
