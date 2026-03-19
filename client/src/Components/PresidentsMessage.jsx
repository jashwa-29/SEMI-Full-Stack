import React from "react";
import dr from "../assets/Dr. SOWJANYA SHREE PATIBANDLA.webp";

const PresidentsMessage = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-28">
        {/* Enhanced Heading */}
        <div className="flex items-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            President's Message
          </h2>
          <div className="ml-6 flex-1 h-[2px] bg-blue-600" />
        </div>

        {/* Enhanced Content Grid */}
        <div className="grid gap-10 md:grid-cols-[280px,1fr] items-start">
          {/* Enhanced President Card */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-64 h-64 overflow-hidden rounded-lg shadow-md mb-4">
              <img
                src={dr}
                alt="Dr S Saravana Kumar"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-900 mb-1">
                Dr. Shree Sowjanya Patibandla
              </p>
              <div className="w-12 h-0.5 bg-blue-600 mx-auto md:mx-0 my-2"></div>
              <p className="text-blue-600 font-medium text-sm">
                National President
              </p>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Society for Emergency Medicine India
              </p>
            </div>
          </div>

          {/* Enhanced Message Box */}
          <div className="relative">
            <div className="border border-gray-200 rounded-xl shadow-sm px-8 py-8 h-[340px] overflow-y-auto custom-scroll text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Dear members of SEMI, respected seniors, colleagues, and friends,
              </h3>

              <div className="space-y-5">
                <p>
                  It is truly an honor—and a responsibility I carry with deep humility—to stand before you today as the 13th National President of the Society for Emergency Medicine India.
                </p>

                <p>
                  This is not just a new role or a new title. For me, it is a continuation of a journey—one that many of us in this room have walked together for years.
                </p>

                <p>
                  Today does not belong to one individual. It belongs to SEMI. To its 27-year legacy of perseverance, advocacy, and belief in a specialty that once struggled to find its place.
                </p>

                <p>
                  I want to begin by acknowledging and thanking our founding members, past presidents, mentors, and leaders—those who had the courage to imagine Emergency Medicine in India when it was still seen as “just casualty.” Because of your vision and resilience, Emergency Medicine today stands as a recognized, respected, and indispensable specialty in our healthcare system.
                </p>

                <p>
                  On a personal note, I am deeply grateful to the SEMI fraternity for the trust you have placed in me. My 18-year journey in Emergency Medicine, including 12 years on the SEMI Board, has shaped not just my career, but my convictions. Every role I’ve held—academic responsibilities, leadership positions, and most recently as Controller of Examinations—has reinforced one belief: that transparent systems, academic integrity, and fairness are the backbone of a strong specialty. The examination reforms we worked on were never just administrative changes. They were about credibility, trust, and respect for our trainees—the future emergency physicians of this country.
                </p>
                
                <p>
                  Emergency Medicine is not just a specialty. It is a lifeline. We are often the first point of contact when lives hang in the balance. We make decisions in seconds—often with incomplete information, limited resources, and enormous pressure. But our role goes beyond resuscitation bays and triage desks. Emergency Medicine demands clinical excellence, teamwork, compassion, communication, and equity—all at the same time.
                </p>

                <p>
                  In a country as vast and diverse as India, Emergency Medicine carries a unique responsibility: to ensure that every patient—regardless of geography, background, or socioeconomic status—has access to timely and competent emergency care.
                </p>

                <p>
                  Over the past two decades, we have witnessed a remarkable transformation. From unstructured casualty services to a growing, system-driven specialty with formal training pathways and global recognition. And SEMI has been at the heart of this journey—through academics, capacity building, research, advocacy, and service. Because of this collective effort, thousands of emergency care professionals across India are better trained, better supported, and better prepared.
                </p>

                <p>
                  But let us be honest with ourselves. Our work is far from done. The next phase of Emergency Medicine in India must focus on:
                </p>

                <ul className="list-disc pl-5 space-y-2">
                  <li>Strengthening education and research,</li>
                  <li>Expanding emergency systems to underserved and rural regions,</li>
                  <li>Improving community preparedness and public awareness, and</li>
                  <li>Harnessing technology and innovation to bridge gaps in access and equity.</li>
                </ul>

                <p>
                  We must build emergency care systems that are resilient, inclusive, and future-ready—where emergency care is not a privilege, but a basic right. With our state chapters, our academic partners, policymakers, international collaborators, and—most importantly—our members on the ground who show up every day to serve patients. SEMI will continue to be a space for leadership, mentorship, collaboration, and innovation, while staying rooted in the values that define Emergency Medicine.
                </p>

                <p>
                  Let us move forward—stronger, wiser, and more united than ever before. Because in Emergency Medicine, we don’t just save lives. We build systems. We inspire change. And together, we shape the future of healthcare in India.
                </p>

                {/* Signature Section */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">Warm regards,</p>
                  <p className="text-blue-600 font-semibold mt-1">Dr. Shree Sowjanya Patibandla MD, MBA.</p>
                  <p className="text-gray-500 text-sm">National President</p>
                  <p className="text-gray-500 text-sm">Society for Emergency Medicine India (SEMI)</p>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center text-xs text-gray-400">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll to read
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f8fafc;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </section>
  );
};

export default PresidentsMessage;