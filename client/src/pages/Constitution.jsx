import React, { useState } from 'react';
import PageHeader from '../Components/PageHeader';

const Constitution = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "preamble",
      title: "PREAMBLE",
      content: `Emergency Medicine (EM) is an evolving specialty overlapping multiple primary specialties. Recognizing the increasing need to consolidate the field and to promote awareness, continuing education and research in this field, the Society for Emergency Medicine – India (SEMI) was formed in the year 1999.`
    },
    {
      id: "name",
      title: "1. NAME",
      content: `Name of the association shall be Society for Emergency Medicine, India [SEMI]`
    },
    {
      id: "headquarters",
      title: "2. HEADQUARTERS",
      content: `Head Quarters of the Society shall be in Hyderabad to be located at Apollo Emergency Hospital, Hyderguda, at Hyderabad. (Updated Address – Society for Emergency Medicine India, 4th Floor, Apollo Health City, Jubilee Hills, Hyderabad, 500034, India.)`
    },
    {
      id: "aims",
      title: "3. AIMS & OBJECTIVES",
      content: `The objectives of the Society shall be:`,
      subsections: [
        {
          title: "3.1",
          content: "To promote and advance modern medical science of Emergency Medicine and its related branches"
        },
        {
          title: "3.2 Eligibility Criteria for various Memberships",
          subsections: [
            {
              title: "3.2(1) LIFE MEMBER",
              content: "A Medical doctor with an MBBS Degree or equivalent and being on the rolls of Medical Council of India or State Medical Register with an active interest in Emergency Medicine"
            },
            {
              title: "3.2(2) ASSOCIATE LIFE MEMBER",
              content: "A paramedic with a degree/diploma from an institution approved by the Society shall be eligible for associate membership. An Associate Member/Associate Life Member shall be eligible to participate in the meetings/conferences, seminars of the society but shall not be eligible to contest in the elections to the Managing Committee of the society and its units and shall also not have the right to vote in such elections"
            },
            {
              title: "3.2(3) CORPORATE SPONSOR",
              content: "A person from industry with an active contribution towards Emergency Medicine and shall not be eligible to contest in the elections to the Managing Committee of the society and its units and shall also not have the right to vote in such elections"
            }
          ]
        },
        {
          title: "3.3 Membership Procedure",
          subsections: [
            {
              title: "3.3(1)",
              content: "The Managing Committee shall have the authority to admit applicants to all categories of membership"
            },
            {
              title: "3.3(2)",
              content: "The membership application shall be in the form prescribed by the Managing Committee. It shall be accompanied by documentary evidence of eligibility, qualification & prescribed fees"
            },
            {
              title: "3.3(3)",
              content: "The duly completed application form; after due scrutiny by the General Secretary will be placed before the Managing Committee in its regular meeting for approval after which the membership will be conferred to the applicant"
            },
            {
              title: "3.3(4)",
              content: "The Managing Committee shall also accept the resignation from membership, as also decide cessation of membership for any other reason"
            }
          ]
        },
        {
          title: "3.4 Membership Fees",
          subsections: [
            {
              title: "3.4(1)",
              content: "Fees shall be as follows, Life Member Rs.3,000, Associate Membership Rs.1,500 and Corporate Sponsor Rs.10,000 (Rs. 25,000)"
            },
            {
              title: "3.4(2)",
              content: "The membership shall commence only when the full amount is received"
            }
          ]
        },
        {
          title: "3.5 Expulsion",
          content: "A member found acting adversely against the interest of the society can be expelled from the society by two thirds majority of the members present in the general body. Expulsion proceedings are initiated by the Managing Committee by appointing an inquiry committee comprising of 3 members other than Managing Committee members. The inquiry committee shall give hearing to the member against whom the expulsion proceedings are initiated and submit its report in writing on or before the stipulated date to the Managing Committee. Managing Committee shall accept the report and table the said report before the General Body"
        },
        {
          title: "3.6 Register of Members",
          content: "A register of members containing their names and addresses shall be kept. All changes in the status of members or their addresses, taking place from time to time shall be recorded. A complete list of members with their addresses shall be circulated to all members once in three years"
        },
        {
          title: "3.7 Privileges of Membership",
          subsections: [
            {
              title: "3.7(1)",
              content: "All life and associate members shall be entitled to participate in all activities of the society. They shall also receive a copy of the journal when it is published and other periodicals free or at discount"
            },
            {
              title: "3.7(2)",
              content: "The right to vote shall rest only with the life members"
            }
          ]
        },
        {
          title: "3.8 Resignation",
          content: "A member/associate member may tender his resignation in writing and management committee is empowered to accept the same. However, no refund of amount / fee paid to the society will be made."
        }
      ]
    },
    {
      id: "elections",
      title: "4. ELECTIONS",
      subsections: [
        {
          title: "4.1 Eligibility",
          subsections: [
            {
              title: "4.1(1)",
              content: "For the post of President, the candidate should have been elected and not nominated on the Managing Committee for at least one Term"
            },
            {
              title: "4.1(2)",
              content: "For all other positions, membership of the society for at least 1 year is mandatory. For re-eligibility to contest election for any post on the Managing Committee the candidate must have attended at least one Managing Committee meeting excluding the one held at the annual conference i.e. a total of 2 (two) out of 4 (four) Managing Committee meetings"
            },
            {
              title: "4.1(3)",
              content: "No member shall be eligible to seek election for more than 3 tenures as Vice President, General Secretary and Treasurer"
            },
            {
              title: "4.1(4)",
              content: "The president shall not seek election for any position in the Managing Committee after completing his / her tenure. However he / she can be nominated on the Managing Committee as may be decided by the Managing Committee"
            },
            {
              title: "4.1(5)",
              content: "A member shall not contest simultaneously for more then one post (i.e. President, Vice president, honorary secretary, or Treasurer)"
            }
          ]
        },
        {
          title: "4.2 Election Procedure",
          subsections: [
            {
              title: "4.2(1)",
              content: "The president shall become immediate past president and the president – elect shall become president automatically after the expiry of their tenure at the end of their term during the concerned annual general body meeting. The elections shall be held for president, 5 vice presidents, General Secretary, and treasurer each 2 years"
            },
            {
              title: "4.2(2)(a)",
              content: "By 1st August, the honorary secretary shall send to each member a list of vacancies in the Managing Committee & invite nominations for these vacancies. The nomination paper will contain information regarding the candidate's name, address and the post for which the candidate is contesting. The name shall be proposed by one valid member and duly signed by the Managing Committee if elected. There shall be a separate nomination paper for each post. These nominations must reach the secretariat not later than 15th September. For every post, the nomination paper must be accompanied by a sum of Rs. 1,000/- (Rupees One Thousand only) from a candidate in the form of demand draft. A nomination paper not accompanied by a Bank Draft of Rs. 1,000/- shall be deemed invalid. A short biodata not exceeding 200 words shall accompany the nomination if desired"
            },
            {
              title: "4.2(2)(b)",
              content: "The Managing Committee in its regular meeting shall appoint an election commission headed by the president, as chairperson along with two non-contesting members to oversee the entire proceedings of the election. The elections will be conducted during the annual conference after which the results will be announced during the Annual General Body meeting and the new Managing Committee will come into existence"
            },
            {
              title: "4.2(3)",
              content: "The General Secretary shall inform the contesting candidate of all the nominations received for the post they are contesting and if any one wishes to withdraw his nomination, he should inform honorary secretary or election commission member in writing on or before 30th September"
            },
            {
              title: "4.2(4)",
              content: "By 15th October, the General secretary shall announce the final list of candidates contesting for each category, if the number of nominations for each category exceeds the seats on the Managing Committee"
            },
            {
              title: "4.2(5)",
              content: "If the dead line for any of these procedures falls on a Sunday or a Bank holiday, next working day shall be considered as the deadline"
            },
            {
              title: "4.2(6)",
              content: "Voting for each category will be held during the Annual Conference. The ballot papers shall bear the signature of the chairperson of the election commission and one of the two scrutinizers"
            },
            {
              title: "4.2(7)",
              content: "These ballot papers shall be scrutinized and the results declared during the Annual General Body Meeting at the Annual Conference"
            },
            {
              title: "4.2(8)",
              content: "Any Managing Committee member may resign his/her position by giving notice in writing to the General Secretary or the President. The resignation shall take effect from the date of its acceptance by the Managing Committee"
            },
            {
              title: "4.2(9)",
              content: "Any Managing Committee member who ceases to be a valid member shall be deemed to have vacated his or her position in the Managing Committee"
            },
            {
              title: "4.2(10)",
              content: "If a vacancy occurs in any office otherwise than by efflux of time, the Managing Committee shall elect a member to fill this vacancy–not withstanding anything contained in clause 4.2.8. However the General Secretary shall invite nomination by an urgent short notice. In the event of a contest, voting will be held in the ensuing Managing Committee meeting by the members attending the Managing Committee"
            }
          ]
        },
        {
          title: "4.3 Election Disputes",
          subsections: [
            {
              title: "4.3(1)",
              content: "In the first instance, any complaint pertaining to any process of election, if any, except counting of ballots must be lodged with the chairperson of election commission along with documentary proof of any irregularity before the start of the counting procedure. No complaint other than that of the counting procedure shall be entertained once the counting procedure has started. Complaints pertaining to the counting procedure or counting irregularities, if any, must be lodged in writing by the contestant or his representative with the chairperson of election commission during the procedure or immediately after the counting has been completed or within fifteen days after the completion of counting"
            },
            {
              title: "4.3(2)",
              content: "An election redressal committee comprising of the president, two immediate past presidents and chairperson of election commission would review the evidence provided by the complaint and would give its ruling within 15 days"
            }
          ]
        },
        {
          title: "4.4 Co-Option of Governing Body Members",
          subsections: [
            {
              title: "4.4(1)",
              content: "The executive committee shall co-opt the following members in their first meeting after the Annual General Body Meeting"
            },
            {
              title: "4.4(1)(a)",
              content: "Joint Secretary from the place of the President"
            },
            {
              title: "4.4(1)(b)",
              content: "2 Organizing Secretary of Conference if any, Chairman of committees & editor of the Official journal"
            },
            {
              title: "4.4(2)",
              content: "The nomination for joint Secretary shall be made by the president and the nomination for Organizing Secretary shall be made by the branch hosting the conference."
            }
          ]
        }
      ]
    },
    {
      id: "precedence",
      title: "5. ORDER OF PRECEDENCE AND PROTOCOL",
      subsections: [
        {
          title: "5.1",
          content: "Order of precedence shall be as under: 1. President, 2. Immediate Past President, 3. Vice President, 4. General Secretary, 5. Joint Secretary, 6. Treasurer"
        }
      ]
    },
    {
      id: "meetings",
      title: "6. MEETINGS",
      subsections: [
        {
          title: "6.1 General Body",
          subsections: [
            {
              title: "6.1(1) Annual General Body Meeting",
              content: "The Annual General Body Meeting of the Society shall be held each on a day, time and place to be fixed by Managing Committee (November unless otherwise decided by the Managing Committee under exceptional situations) when the change of office bearers, if any, will take place. The Notice and Agenda for the Annual general Body Meeting of the Society shall be posted at least 21 days in advance of the date fixed for the meeting. Any member desiring to move a resolution at the Annual Meeting shall give notice of the same in writing to the general secretary at least 45 days before the date fixed for the General Meeting"
            },
            {
              title: "6.1(2)",
              content: "The President shall preside over all meetings of the Managing Committee and the General Body. If the President is not present, one of the Vice-Presidents in order of seniority or in their absence, one of the committee members present at the meeting shall be elected by other members to preside over the meeting. The seniority of the Vice-President shall be decided by the number of votes polled in the elected or, in case of uncontested election, by the length of membership of the society"
            },
            {
              title: "6.1(3)",
              content: "The President may, whenever he thinks fit, and upon a requisition made in writing and signed by not less than 10% or 50 whichever is less shall convene a special General Body Meeting. Any requisition made by the members shall state the objects of the special meeting proposed to be called and shall be addressed to the General Secretary"
            },
            {
              title: "6.1(4)",
              content: "The General Secretary shall, upon receipt of such a requisition, proceed to convene, under orders of the president, a special General Body Meeting which shall be held within 30 days from the date of receipt of such a requisition, at a place and time fixed by the President"
            },
            {
              title: "6.1(5)",
              content: "At the special General Body Meeting, only the business for which notice has been given for such questions as naturally arises thereon shall be discussed"
            },
            {
              title: "6.1(6)",
              content: "10% of members or 50 whichever is less present at a General Body Meeting shall form the quorum for that meeting"
            },
            {
              title: "6.1(7)",
              content: "A meeting of the General body if adjourned for want of quorum shall be held within 30 minutes on the same day at the same venue with or without quorum and such a meeting shall transact the business specified on the agenda for the meeting only"
            },
            {
              title: "6.1(8)",
              content: "The person presiding at the General Body Meeting may, with the consent of the Members, adjourn the same from time to time and from place to place: but no business shall be transected at any adjourned meeting other than the business left unfinished at the meeting from which the adjournment took place"
            },
            {
              title: "6.1(9)",
              content: "No quorum shall be necessary for any adjourned General Body Meeting"
            },
            {
              title: "6.1(10)",
              content: "Subject to the law being in force at that time the resolutions passed in a General Body Meeting shall be given immediate effect to, by the office-bearers of the Society, unless stated otherwise"
            }
          ]
        },
        {
          title: "6.2 Governing Body",
          subsections: [
            {
              title: "6.2(1)",
              content: "A meeting of the Managing Committee shall be convened by the General Secretary with the consent of the President"
            },
            {
              title: "6.2(2) Managing Committee Meeting",
              content: "The Managing Committee shall meet at least twice in a year or at such times necessary for transactions of the business for the society. It will submit an annual report of the activities of the Society together with a statement of the assets and liabilities of the society and an abstract of receipts and disbursements during the year and the report of the auditors, if any during the last Managing Committee meeting before the Annual General Body Meeting"
            },
            {
              title: "6.2(3)",
              content: "The General Secretary shall convene a special meeting of the Managing Committee upon a requisition in writing signed by not less than 5 members of the Managing Committee. A notice for such a meeting shall be sent by mail or an email, preferably by both. At least three weeks prior notice shall be given to the members of the Managing Committee for an ordinary meeting of the Governing Body. An urgent meeting may be called at a shorter notice which should not be less than 7 days. If all the members are unable to meet in one place, the meeting may be held through video conferencing."
            }
          ]
        }
      ]
    },
    {
      id: "property",
      title: "7. PROPERTY, MONEY AND ACCOUNTS",
      subsections: [
        {
          title: "7.1",
          content: "The property, movable or immovable, belonging to the Society shall vest in the Managing Committee"
        },
        {
          title: "7.2",
          content: "No sale, exchange, mortage, lease or other transfer of immovable property belonging to the Society shall be valid till at least the President and one of the Vice-President or the General Secretary shall execute the document of transfer"
        },
        {
          title: "7.3",
          content: "All Funds of the Society shall be deposited and / or invested",
          subsections: [
            {
              title: "7.3(1)",
              content: "In approved Bank or Banks. The facility of Electronic banking / Internet banking shall be availed"
            },
            {
              title: "7.3(2)",
              content: "In Government other negotiable trust securities or in any other mode permitted under the act or in accordance with the administrative orders of Government from time to time"
            }
          ]
        },
        {
          title: "7.4",
          content: "Accounts and other investments in the name of the Society shall be operated by the Treasurer, & President or General Secretary, each document being signed by any two of them."
        }
      ]
    },
    {
      id: "duties",
      title: "8. DUTIES OF OFFICE BEARERS",
      subsections: [
        {
          title: "8.1 The President",
          subsections: [
            {
              title: "8.1(1)",
              content: "To preside over the meetings at short notice of the general body and Managing Committee"
            },
            {
              title: "8.1(2)",
              content: "To convene extra ordinary meetings at short notice of the general body whenever necessary"
            },
            {
              title: "8.1(3)",
              content: "To exercise general supervision over the affairs of the Society"
            },
            {
              title: "8.1(4)",
              content: "The President shall exercise his deciding vote in case of a tie"
            },
            {
              title: "8.1(5)",
              content: "The term of the President will be for 2 years"
            }
          ]
        },
        {
          title: "8.2 Vice President",
          subsections: [
            {
              title: "8.2(1)",
              content: "There shall be 5 Vice President representing 5 regions, North, South, Central, East, & West"
            },
            {
              title: "8.2(2)",
              content: "The term of the Vice Presidents will be for 2 years"
            },
            {
              title: "8.2(3)",
              content: "In the absence of the President, the Vice President next in line shall perform all the duties of the President"
            }
          ]
        },
        {
          title: "8.3 General Secretary",
          subsections: [
            {
              title: "8.3(1)",
              content: "General Secretary shall be elected by the general body once in 2 years"
            },
            {
              title: "8.3(2)",
              content: "To prepare the agenda and convene the meetings of the general body and Managing Committee and too maintain all records of the Society"
            },
            {
              title: "8.3(3)",
              content: "It shall be incumbent upon him to convene a meeting of the Managing Committee on the written request of any members of the same"
            },
            {
              title: "8.3(4)",
              content: "To record and maintain the minutes of all the meetings of the general body and Managing Committee"
            },
            {
              title: "8.3(5)",
              content: "To implement the resolutions of the general body, Managing Committee"
            },
            {
              title: "8.3(6)",
              content: "To maintain the membership register"
            },
            {
              title: "8.3(7)",
              content: "To receive donations gifts and subscription in cash or kind for and on behalf of the Society and inform the Managing Committee"
            },
            {
              title: "8.3(8)",
              content: "To represent the society in all legal matters and to advocates for the purpose with the approval of the Managing Committee"
            },
            {
              title: "8.3(9)",
              content: "To hire necessary administrative staff within the guidelines approved by the Managing Committee"
            },
            {
              title: "8.3(10)",
              content: "Term shall be for 2 years"
            }
          ]
        },
        {
          title: "8.4 Joint Secretaries",
          subsections: [
            {
              title: "8.4(1)",
              content: "A Joint Secretary from the region of the President – elect is nominated by the general body at the annual meeting"
            },
            {
              title: "8.4(2)",
              content: "The Joint Secretary shall assist the Honorary Secretary and also maintain the records and the membership register. In absence of the Honorary Secretary, the Joint secretary shall carry out all his duties and all the duties assigned specially by the Managing Committee"
            },
            {
              title: "8.4(3)",
              content: "Term shall be for 2 years"
            }
          ]
        },
        {
          title: "8.5 Treasurer",
          subsections: [
            {
              title: "8.5(1)",
              content: "He is responsible for preparing and maintaining / operating of accounts and account books"
            },
            {
              title: "8.5(2)",
              content: "To submit Bank transactions and Accounts at every to Managing Committee meetings or every three months whichever is earlier"
            },
            {
              title: "8.5(3)",
              content: "To present annual audited accounts to the general body"
            },
            {
              title: "8.5(4)",
              content: "Term shall be for 2 years"
            }
          ]
        }
      ]
    },
    {
      id: "miscellaneous",
      title: "9. MISCELLANEOUS ADMINISTRATIVE RULES",
      subsections: [
        {
          title: "9.1",
          content: "Every question submitted to a meeting of the Managing Committee or of the General Body shall be decided according to the majority of the votes cast by the members present and voting at such a meeting in case of equality of votes, the person presiding shall have a second or casting vote in addition to his vote as a member"
        },
        {
          title: "9.2",
          content: "Once at least in every year the accounts of the society shall be examined and audited and their correctness ascertained by one or more registered accountant appointed for the ensuing year by the members at annual general body meeting each year. The report of the auditor or auditors shall form part of the Annual Report submitted to the next general body meeting. The Auditor of the Society shall hold office until the next Annual General Body Meeting. The retiring auditors shall be eligible for reappointment. The Auditor or Auditors shall be paid such remuneration or honorium as the members may fix at the Annual General Body Meeting at which such Auditor or Auditors may be appointed"
        },
        {
          title: "9.3",
          content: "Any notice required by these rules may be given by sending by Registered post letter & emails to the address mentioned in the register of members and the same shall be deemed to have been received by the addressee on the date on which it would have reached him in the ordinary course of post"
        },
        {
          title: "9.4",
          content: "In the event of lack of time the President and the Office bearers are empowered to take disciplinary action against Member(s)/Associate Member(s)/Corporate Member(s)/Organizing Committee acting adversely against the interest of the Society."
        }
      ]
    },
    {
      id: "academic",
      title: "10. ACADEMIC WINGS",
      subsections: [
        {
          title: "10.1(1)",
          content: "The Society may consult one or more Academic Wings under its framework to carry out its Academic and Research objectives"
        },
        {
          title: "10.1(2)",
          content: "Such wings or units shall evolve their own working rules and regulation within the framework of the Society."
        }
      ]
    },
    {
      id: "conference",
      title: "11. CONFERENCE",
      subsections: [
        {
          title: "11.1",
          content: "The annual conference conducted by SEMI (EMCON) will be held during the month of November and International Emergency Conference (INTEM) will be held once in four years instead of EMCON"
        },
        {
          title: "11.2",
          content: "Conference venue will be selected by the executive committee after receiving eligible bids from the interested college / hospital / state chapter based on the criteria decided by the executive committee"
        },
        {
          title: "11.3",
          content: "Seed money of One Lakh will be given by the SEMI main body to the organizers of the next conference, within one month of completion of the present conference, as an interest free loan which should be remitted back to the SEMI body within one month of completion of the conference. This will ensure that the amount is available to be given for the next conference"
        },
        {
          title: "11.4",
          content: "25% of the delegate fees and 10% of Corporate Sponsor fee must be given to SEMI within 3 months of completion of the conference."
        },
        {
          title: "11.5",
          content: "Conference accounts & expenditures should be audited by a reputed auditor and tabled during the next annual general body meeting"
        },
        {
          title: "11.6",
          content: "Faculty registration is compulsory within 1 month of acceptance of invitation."
        }
      ]
    },
    {
      id: "state-units",
      title: "12. STATE UNITS",
      subsections: [
        {
          title: "12.1",
          content: "25 or more members residing in any state or union territory and desirous of forming a state unit shall inform the Managing Committee and on securing the permission of the Managing Committee shall form a state unit. Each state or union territory shall have only one unit and such unit shall function subject to the provisions of this constitution and the byelaws governing for the state unit as approved by the Managing Committee"
        },
        {
          title: "12.2",
          content: "Immediately after the formation of state unit, all the members and associate members of the Society residing in that state or union territory shall automatically become members and associate members of the state unit"
        },
        {
          title: "12.3",
          content: "The management of the affairs & business of the State unit shall be vested in the executive committee whose office bearers shall be elected by members of the State unit"
        },
        {
          title: "12.4",
          content: "The Managing Committee of the State unit shall consist of President, Vice President, General Secretary and Treasurer. The immediate Past President may be co-opted. The Office bearers of the State unit shall exercise the same functions and shall have the same duties and powers as the Managing Committee. Such exercise of powers shall however be subject to such guidelines as may be laid down from time to time by the society or the Managing Committee. The Managing Committee shall meet at least once in six months. The quorum shall be of 4 members"
        },
        {
          title: "12.5",
          content: "If a separate membership fee is collected from the members of the State unit, 25% of the amount so collected shall be remitted to the society. Likewise 25% of the income generated by the state unit through workshops, seminars, conferences etc shall be remitted to the society. The balance sum shall be retained by the state unit for its activities."
        }
      ]
    },
    {
      id: "funds",
      title: "13. FUNDS",
      subsections: [
        {
          title: "13.1",
          content: "The amount received by the society as membership fee and the income received on holding seminars, conferences, Exhibition fees, Training Programme fees, Publications, Contribution from Patrons and Donations etc will be deposited in a Scheduled Bank as approved by the Managing Committee"
        },
        {
          title: "13.2",
          content: "The interest accrued only will be utilized for the purpose of the society. The funds shall be spent only to the attainment of the objects of the society and no portion thereof shall be paid or transferred directly or indirectly to any of the members through any means."
        }
      ]
    },
    {
      id: "amendments",
      title: "14. AMENDMENTS TO THE CONSTITUTION",
      subsections: [
        {
          title: "14.1",
          content: "The constitution can be amended at a special meeting of the general body convened for the purpose by a requisition in writing or email from at least 50 members. The proposed amendments shall be circulated among the members through mail or email"
        },
        {
          title: "14.2",
          content: "At least 21 days notice of the meeting to consider such amendments shall be given to the members. The amendments shall be discussed and voted upon and shall become part of the constitution if it is carried by not less than 2/3rd of the members present in the special meeting of the general body convened."
        }
      ]
    }
  ];

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">{content}</p>;
    }
    return null;
  };

  const renderSubsections = (subsections, level = 0) => {
    if (!subsections) return null;

    return subsections.map((subsection, index) => (
      <div key={index} className={`${level > 0 ? 'ml-4' : ''} mb-4`}>
        {subsection.title && (
          <h4 className={`font-semibold text-gray-900 mb-2 ${
            level === 0 ? 'text-lg' : 
            level === 1 ? 'text-md' : 'text-sm'
          }`}>
            {subsection.title}
          </h4>
        )}
        {subsection.content && renderContent(subsection.content)}
        {subsection.subsections && renderSubsections(subsection.subsections, level + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-white ">
   

      <PageHeader 
        title="Constitution"
        description="Society for Emergency Medicine India"
        breadcrumbs={[
          { label: "About", link: "/about" },
          { label: "Constitution" }
        ]}
      >
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 max-w-2xl mx-auto shadow-lg mt-8">
          <p className="text-gray-800 font-bold text-lg mb-2">
            Society for Emergency Medicine, India (SEMI)
          </p>
          <p className="text-gray-600 mb-2 font-medium">Regd. No. 3602 / 2000</p>
          <p className="text-blue-600 font-semibold text-lg">
            New Amended Constitution - November 2008
          </p>
        </div>
      </PageHeader>

      {/* Constitution Content */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-32 max-h-[80vh] overflow-y-auto shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Constitution Sections</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        const element = document.getElementById(section.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(section.id);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="p-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    
                    {section.content && renderContent(section.content)}
                    {section.subsections && renderSubsections(section.subsections)}
                  </div>
                ))}
              </div>

              {/* Download Section */}
              <div className="mt-8 bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="mb-4 lg:mb-0 lg:mr-6">
                    <h3 className="text-xl font-bold mb-2">Complete Constitution Document</h3>
                    <p className="text-blue-100 text-[15px]">
                      Download the full constitution document in PDF format for detailed reading of all sections.
                    </p>
                  </div>
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl whitespace-nowrap">
                    Download Full PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Constitutional Queries</h2>
          <p className="text-gray-600 mb-6 text-[15px]">
            For questions regarding the constitution, amendment procedures, or membership details, please contact SEMI Head Office.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Contact SEMI Office
          </button>
        </div>
      </div>
    </div>
  );
};

export default Constitution;


