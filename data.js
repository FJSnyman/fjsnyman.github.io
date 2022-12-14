Date.prototype.compareTo = function (that) { return this.valueOf() - that.valueOf() }
Number.prototype.orIfZero = function (callback) { return this != 0 ? this : callback() }

class CVData {
	static populateData() {
		// Personal Info
		const personalInfo = this.personalInfo();
		document.getElementById("name").innerHTML = personalInfo.name;
		document.getElementById("cover").innerHTML = personalInfo.cover.join("<br/>");
		const buttonArea = document.getElementById("personal-info-buttons");
		if (personalInfo.links) {
			const template = document.getElementById("template-button").innerHTML;
			const collection = [];
			for (const link of personalInfo.links) {
				const element = template
					.replace('${prop-icon}', link.icon)
					.replace('${prop-name}', link.name)
					.replace('${prop-href}', link.href)
				collection.push(element);
			}
			const tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			buttonArea.appendChild(tm.content);
		} else {
			buttonArea.remove();
		}
		
		// Work History
		const workHistory = this.workHistory();
		if (workHistory != null) {
			const workList = document.getElementById("work-history");
			const template = document.getElementById("template-histitem").innerHTML;
			const period = template.match(/(.*)\$\{litem-when\}(.*)/);
			const comment = template.match(/(.*)\$\{litem-comment\}(.*)/);

			workHistory.sort((a, b) => b.periods[0]['end'].compareTo(a.periods[0]['end']).orIfZero(() => b.periods[0]['start'].compareTo(a.periods[0]['start'])));

			const collection = [];
			for (const item of workHistory) {
				const element = template
					.replace("${prop-title}", item.title)
					.replace("${prop-place}", item.place);

				item.periods.sort((a, b) => b.start.valueOf() - a.start.valueOf());
				let whenString = "";
				for (const p of item.periods) {
					whenString += `${period[1]}${p['name']}${period[2]}`;
				}

				const comments = [];
				for (const c of item.comments) {
					comments.push(`${comment[1]}<b>${c['main']}</b><br/>${c['body']}${comment[2]}`);
				}
				const commentString = comments.join('');

				const row = element
					.replace(/<.*\$\{litem-when\}.*>/, whenString)
					.replace(/<.*\$\{litem-comment\}.*>/, commentString);
				collection.push(row);
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
					.replace("${prop-place}", item.place)
					.replace("${litem-comment}", item.comment);

				item.periods.sort((a, b) => b.start.valueOf() - a.start.valueOf());
				let periodString = "";
				for (const p of item.periods) {
					periodString += `${period[1]}${p['name']}${period[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-when\}.*>/, periodString));
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
					.replace("${prop-type}", skill.type)
					.replace("${prop-title}", skill.title);

				let itemString = "";
				for (const item of skill['items']) {
					itemString += `${items[1]}${item}${items[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-item\}.*>/, itemString));
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
			const interestList = document.getElementById("interests");
			const template = document.getElementById("template-interestitem").innerHTML;
			const items = template.match(/(.*)\$\{litem-interest\}(.*)/);

			let itemString = "";
			for (const item of interests) {
				itemString += `${items[1]}${item}${items[2]}`;
			}

			const tm = document.createElement("template");
			tm.innerHTML = template.replace(/<.*\$\{litem-interest\}.*>/, itemString);
			interestList.appendChild(tm.content);
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
			"links": [
				{
					"name": "Download CV",
					"icon": "ico/download.svg",
					"href": "downloads/fjsnyman-cv-download.pdf",
				},
				{
					"name": "hello@fjsnyman.co.za",
					"icon": "ico/email.svg",
					"href": "mailto:hello@fjsnyman.co.za",
				},
			],
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
				"title": "Java Developer",
				"place": "Kwaden Software Development",
				"comments": [
					{
						"main": "Designed and developed microservices and APIs",
						"body": "using Spring Boot (Java) using MySQL, AMQ with RabbitMQ, IAC with Kubernetes, scripting with Bash and Powershell, and CICD with Jenkins and GitHub Actions."
					},
					{
						"main": "Performed various administrative tasks daily",
						"body": "including project management with Jira and Confluence, log monitoring and diagnostics, and server management using Rancher, Portainer, Kubectl, or SSH."
					},
					{
						"main": "Researched, presented and implemented new techniques and technologies",
						"body": "to improve existing systems and processes. Presentations were made to directors and technical managers, then I was assigned to lead the project's implementation, task delegation and collaboration efforts with other departments."
					},
				],
			},
			{
				"periods": [{
					"start": new Date("2020-05-01"),
					"end": new Date("2020-10-15"),
					"name": "2020",
				}],
				"title": "Integration Developer",
				"place": "Truckin-IT Start-Up Mobile App",
				"comments": [
					{
						"main": "Developed internal functionality for Android app with Dart & Flutter",
						"body": "for a shipping and logistics management solution with automated load-sharing and driver route optimisation. Included network call handling (RESTful API calls, response caching and batching) and promise-based middleware to improve front-end developer experience."
					},
				],
			},
			{
				"periods": [{
					"start": new Date("2020-03-09"),
					"end": new Date("2020-06-31"),
					"name": "2020",
				}],
				"title": "Integration Developer",
				"place": "large-team university project (University of Pretoria)",
				"comments": [
					{
						"main": "Lead development of an AI-driven speech-to-image Android app",
						"body": "including development of the core engine, network controllers, and unit testing."
					},
					{
						"main": "Lead overarching project management",
						"body": "to coordinate 40 peers in various sub-teams, lead inter-group communication and conflict management, configure project management tools, and manage Git repositories and access control."
					},
				],
			},
			{
				"periods": [{
					"start": new Date("2020-02-01"),
					"end": new Date("2020-11-30"),
					"name": "2020",
				}],
				"title": "Full-Stack Developer",
				"place": "ARCRA Demo Mobile App",
				"comments": [
					{
						"main": "Co-developed demo Android app using Dart & Flutter",
						"body": "for a conceptual music radio service with user-customisable features. Development tasks were full-stack, with me primarily building internal functionality such as the audio playback engine and song metadata service, and middleware for UI elements to easily access and manage that data."
					},
				],
			},
			{
				"periods": [{
					"start": new Date("2019-03-01"),
					"end": new Date("2020-11-30"),
					"name": "2019 - 2020",
				}],
				"title": "Full-Stack Developer",
				"place": "TuksFM Radio Mobile App",
				"comments": [
					{
						"main": "Developed a lightweight web API (PHP & MySQL)",
						"body": "to serve blog and schedule data from an existing Wordpress instance."
					},
					{
						"main": "Developed internal Android app functionality (Dart & Flutter)",
						"body": " handling network calls to the web service, caching and state management."
					},
				],
			},
			{
				"periods": [
					{
						"start": new Date("2018-11-21"),
						"end": new Date("2019-12-21"),
						"name": "2018 - 2019",
					},
				],
				"title": "Holiday Intern",
				"place": "Kwaden Software Development",
				"comments": [
					{
						"main": "Gained experience with Spring Boot (Java), process-driven developement, and CICD",
						"body": "working during holiday periods with a small, diverse team to develop various web services and tightly integrated front-end apps using HTML, JS, CSS and the Kendo UI library."
					},
				],
			},
			{
				"periods": [{
					"start": new Date("2017-06-01"),
					"end": new Date("2017-12-31"),
					"name": "2017",
				}],
				"title": "Full-Time Intern & Junior Developer",
				"place": "FirstView Media",
				"comments": [
					{
						"main": "Developed full-stack web services (PHP & MySQL)",
						"body": "with RESTful web APIs, with client-side web applications using JavaScript (JQuery), HTML and CSS."
					},
					{
						"main": "Took lead on a collaborative project with a corporate client",
						"body": "which included liaising directly with management staff, scripting the aggregation and collation of large legacy data sets (several ~400GiB databases), and scripting tasks to maintain highly sensitive off-site systems.",
					},
				],
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
				"title": "Received Accolades",
				"place": "University of Pretoria",
				"comment": "Received several awards during graduation and award ceremonies:<ul><li>graduated with distinction (75.2% aggregate)</li><li>2nd runner-up for top achiever in BSc Computer Science</li><li>industry project group winner for 'Best Architectural Awareness' and 'Software Engineering Excellence'</li></ul>"
			},
			{
				"periods": [{
					"start": new Date("2018-01-01"),
					"end": new Date("2020-12-31"),
					"name": "2018 - 2020",
				}],
				"title": "BSc Computer Science degree (with distinction)",
				"place": "University of Pretoria",
				"comment": "Learned invaluable skills in software engineering, mathematics, and time- and stress-management at one of South Africa's most highly rated Computer Science departments. Major categories covered include discrete mathematics, data structures & algorithms, design patterns, operating systems, compiler construction, and graphics programming.",
			},
			{
				"periods": [{
					"start": new Date("2012-01-01"),
					"end": new Date("2016-12-31"),
					"name": "2016",
				}],
				"title": "South African National Senior Certificate (IEB)",
				"place": "Thomas More College (South Africa)",
				"comment": "Completed with senior colours with top-10 academic achiever awards<br/><ul><li>Information Technology - 94% (top of class)</li><li>Core Mathematics - 96%</li><li>Finalist (Top 20 nationally) in South African Computing Olympiad 2016</li><li>Qualified for Mathematics Olympiad round 3 (semi-final) 2015</li></ul>",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end": new Date("2016-11-01"),
					"name": "2016",
				}],
				"title": "Granted Student Membership to IITPSA",
				"place": "Institute of IT Professionals SA",
				"comment": "Invited to join the institute to commemorate finalist placement in the South African Computing Olympiad 2016.",
			},
		];
	}

	// Fetch personal skills - ignored if null
	static skills() {
		return [
			{
				"type": "Technical Skill",
				"title": "Software Development",
				"items": [
					"Highly proficient with industry-standard development tools including <b>Bash</b>, <b>Docker</b> and <b>Git</b>.",
					"Experienced with <b>REST</b> and <b>GraphQL</b> web API architectures.",
					"Experienced building software using <b>ground-up approaches</b>, or frameworks like <b>Spring Boot</b> and <b>Flutter</b>.",
					"Experienced with <b>IAC</b> and <b>CICD</b> using <b>Kubernetes</b> and <b>GitHub Actions</b>.",
				],
			},
			{
				"type": "Technical Skill",
				"title": "Programming Languages",
				"items": [
					"High proficiency with <b>Java SE</b>, <b>Dart</b>, <b>SQL</b>, and <b>Bash Scripting</b>.",
					"Moderate proficiency with <b>HTML</b>, <b>CSS</b>, <b>native JS</b>, and <b>PHP</b>.",
					"Basic proficiency with <b>Golang</b>, <b>Python</b>, <b>C++ 17</b>, <b>native C</b>, and <b>x86-64 assembly</b> (NASM/YASM).",
				],
			},
			{
				"type": "Soft Skill",
				"title": "Organisation & Leadership",
				"items": [
					"Experience as the <b>lead developer</b> and <b>primary point of contact</b> for multiple <b>ongoing and legacy projects</b> simultaneously.",
					"Experience managing <b>task assignment</b> and <b>facilitating communication</b> in small and large teams with a flat hierarchy.",
					"Experience with <b>project management tools</b> and <b>continuous integration systems</b>.",
				],
			},
			{
				"type": "Soft Skill",
				"title": "Communication",
				"items": [
					"Can clearly <b>present and discuss</b> development goals and concepts at <b>various levels of complexity</b> and transparency as needed, be it to expert developers to clients with minimal technical knowledge.",
					"Able to maintain <b>clear, calm discussion</b> when experiencing confusion or stubbornnes with others.",
					"Quick to <b>build and maintain strong relationships</b> with coworkers, leaders and clients.",
					"Can <b>establish and maintain vision</b> of short- and long-term goals for a project.",
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
