class CVData {
	static populateData() {
		// Personal Info
		let personalInfo = this.personalInfo();
		document.getElementById("name").innerHTML = personalInfo.name;
		document.getElementById("email").innerHTML = personalInfo.email;
		document.getElementById("cover").innerHTML = personalInfo.cover;

		// Work history
		let history = this.history();
		if(history != null) {
			let histList = document.getElementById("history");
			let histTemplate = document.getElementById("template-histitem").innerHTML;
			let whenSpace = histTemplate.match(/(.*)\$\{litem-when\}(.*)/);

			let collection = [];
			history.sort((a,b) => b.periods[0]['start'].valueOf() - a.periods[0]['start'].valueOf());
			for (const item of history) {
				let element = histTemplate
					.replace("${prop-title}", item.title)
					.replace("${prop-comment}", item.comment);

				item.periods.sort((a,b) => b.start.valueOf() - a.start.valueOf());
				let whenString = "";
				for(const p of item.periods) {
					whenString += `${whenSpace[1]}${p['name']}${whenSpace[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-when\}.*/, whenString));
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			histList.appendChild(tm.content);
		} else {
			document.getElementById("history").remove();
		}

		// Skills
		let skills = this.skills();
		if(skills != null) {
			let skillList = document.getElementById("skills");
			let skillTemplate = document.getElementById("template-skillitem").innerHTML;
			let itemSpace = skillTemplate.match(/(.*)\$\{litem-item\}(.*)/);

			let collection = [];
			for (const skill of skills) {
				let element = skillTemplate
					.replace("${prop-title}", skill.title);

				let itemString = "";
				for(const item of skill['items']) {
					itemString += `${itemSpace[1]}${item}${itemSpace[2]}`;
				}
				collection.push(element.replace(/<.*\$\{litem-item\}.*/, itemString));
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			skillList.appendChild(tm.content);
		} else {
			document.getElementById("skills").remove();
		}

		// Interests
		let interests = this.interests();
		if(interests != null) {
			let interestList = document.getElementById("interests").children.item(1);
			let interestTemplate = document.getElementById("template-interestitem").innerHTML;
			let itemSpace = interestTemplate.match(/(.*)\$\{litem-interest\}(.*)/);

			let itemString = "";
			for(const item of interests) {
				itemString += `${itemSpace[1]}${item}${itemSpace[2]}`;
			}
			interestList.innerHTML = itemString;
		} else {
			document.getElementById("interests").remove();
		}

		// Downloads
		let downloads = this.downloads();
		if(downloads != null) {
			let downloadList = document.getElementById("downloads").children.item(1);
			let downloadTemplate = document.getElementById("template-downloaditem").innerHTML;

			let collection = [];
			for (const download of downloads) {
				let element = downloadTemplate
					.replace(/\$\{prop-name\}/g, download.name)
					.replace("${prop-thumb}", download.thumb)
					.replace("${prop-href}", download.href);
				collection.push(element);
			}

			let tm = document.createElement("template");
			tm.innerHTML = collection.join("\n");
			downloadList.appendChild(tm.content);
		} else {
			document.getElementById("downloads").remove();
		}
	}

	static personalInfo() {
		return {
			"name":  "Francois Snyman",
			"email": "francois.snyman@tuks.co.za",
			"cover": "I am a final year BSc Computer Science student at the University of Pretoria with a strong understanding of programming languages and a wide variety software development technologies. I learn quickly, work well in a team and can rapidly solve problems - crucial skills in the world of software development.",
		};
	}

	// Fetch work history - ignored if null
	static history() {
		return [
			{
				"periods": [{
					"start": new Date("2020-03-09"),
					"end":   Date.now(),
					"name":  "2020 (March)",
				}],
				"title":   "U.P. Computer Science 301 Integration Team Member",
				"comment": "Currently leading collaboration with sub-teams via Git repositories, and managing Integration team project management tools.<br/>Supporting role in API and app development efforts.",
			},
			{
				"periods": [{
					"start": new Date("2019-03-01"),
					"end":   Date.now(),
					"name":  "2019 (March) - Present",
				}],
				"title":   "Co-Developed TuksFM Mobile App",
				"comment": "Acted primarily as back-end developer (MySQL + PHP API for legacy compatibility; Dart & Flutter for app-side API calls).",
			},
			{
				"periods": [
					{
						"start": new Date("2018-11-21"),
						"end":   new Date("2018-12-21"),
						"name":  "2018 (Dec)",
					},
					{
						"start": new Date("2019-11-21"),
						"end":   new Date("2019-12-21"),
						"name":  "2019 (Dec)",
					},
				],
				"title":  "Front-End Development Internship at Kwaden Software Development",
				"comment": "Gained experience in process-driven development and microservice-centric development.",
			},
			{
				"periods": [{
					"start": new Date("2018-01-01"),
					"end":   Date.now(),
					"name":  "2018 - Present",
				}],
				"title":   "Ongoing BSc Computer Science degree at University of Pretoria",
				"comment": "Currently studying year 3. Received Golden Key Society invitations for years 1 and 2.",
			},
			{
				"periods": [{
					"start": new Date("2017-06-01"),
					"end":   new Date("2017-12-31"),
					"name":  "2017 (Jul - Dec)",
				}],
				"title":  "Full-Time Intern at FirstView Media",
				"comment": "Primarily acted as MySQL, PHP, JS developer and managed several remote servers. Also aided HTML & CSS development and performed full-stack development for smaller one-man projects.",
			},
			{
				"periods": [{
					"start": new Date("2012-01-01"),
					"end":   new Date("2016-12-31"),
					"name":  "2016",
				}],
				"title":  "Achieved National Senior Certificate (IEB)",
				"comment": "Thomas More College (Kloof, KwaZulu-Natal)<br/><ul><li>Core Mathematics - 96% | Information Technology - 94%</li><li>Qualified for Mathematics Olympiad round 3 (semi-final) 2015</li></ul>",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end":   new Date("2016-11-01"),
					"name":  "2016",
				}],
				"title":  "Granted Student Membership to IITPSA (Institute of IT Professionals SA)",
				"comment": "",
			},
			{
				"periods": [{
					"start": new Date("2016-11-01"),
					"end":   new Date("2016-11-01"),
					"name":  "2016",
				}],
				"title":  "Finalist (Top 20 in SA) in South African Computing Olympiad 2016",
				"comment": "",
			},
		];
	}

	// Fetch personal skills - ignored if null
	static skills() {
		return [
			{
				"title": "Software Development",
				"items": [
					"High proficiency in Java, Dart, PHP, JS, SQL (primarily MySQL), and C++.",
					"Moderate proficiency in HTML, CSS, Go, and C#",
					"Experience with ground-up API development, Flutter, Docker & Kubernetes, and advanced Git use.",
				],
			},
			{
				"title": "Organisational / Managerial",
				"items": [
					"Large group task assignment and active communication, learned during several management roles including March 2020 Integration management.",
					"Experience with process-driven project management tools such as Trello, Jira (version and issue tracking), Git configuration and pipelining, and continuous integration (using Jenkins).",
				],
			},
			{
				"title": "Communication",
				"items": [
					"Can clearly present and discuss development goals and concepts at various levels of complexity as needed, such as with coworkers or clients.",
					"Able to maintain clear, calm discussion when experiencing confusion or stubbornnes with others.",
					"Quick to build and maintain strong relationships with clients and coworkers.",
					"Can establish and maintain short- and long-term goals with teammates.",
				],
			},
		];
	}

	// Fetch personal interests - ignored if null
	static interests() {
		return [
			"Software Engineering and Research",
			"Digital Artistry, 2D and 3D",
			"Designing, Developing, and Playing Video Games",
		];
	}

	// Fetch downloadable attachments - ignored if null
	static downloads() {
		return [
			{
				"name": "UP Academic Record",
				"thumb": "thumbs/tuks.jpg",
				"href": "downloads/annex/up_academic_record_2019.pdf"
			},
			{
				"name": "IITPSA Membership",
				"thumb": "thumbs/iitpsa.jpg",
				"href": "downloads/annex/iitpsa_membership_2016.pdf"
			},
			{
				"name": "NSC",
				"thumb": "thumbs/ieb.jpg",
				"href": "downloads/annex/nsc_2016.pdf"
			},
			{
				"name": "TMC Testemonial",
				"thumb": "thumbs/tmc.jpg",
				"href": "downloads/annex/testemonial_tmc_2016.pdf"
			},
			{
				"name": "IT Olympiad Certificate",
				"thumb": "thumbs/olympiad.jpg",
				"href": "downloads/annex/it_olympiad_2016.pdf"
			},
		];
	}
}