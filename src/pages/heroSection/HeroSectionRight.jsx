import React from 'react'

const HeroSectionRight = () => {
  return (
    <>
      <div className="flex flex-col justify-between w-2/4  max-sm:mt-2  max-sm:pl-8 px-8  bg-white max-[600px]:w-full mt-12 ">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 max-[450px]:grid-cols-1  max-[600px]:grid-cols-2 min-[600px]:grid-cols-2 '>
        {/* Top Image */}
        <img
          src="https://media.istockphoto.com/id/1461683093/photo/man-painting-wall-with-light-blue-dye-indoors-back-view.jpg?s=612x612&w=0&k=20&c=TDg87xVDJh-VA4zVClGlMnqpdqTh2QcZ--raihCv9XU="
          alt="Image 1"
          className="object-fill w-80 h-60 rounded-tl-lg max-[450px]:rounded-lg"
        />
        {/* Middle Image */}
        <img
          src="https://www.shutterstock.com/image-photo/cleaner-using-mops-mop-uniform-600nw-2501295075.jpg"
          alt="Image 3"
          className="object-fill w-80 h-48 rounded-tr-lg  max-[450px]:rounded-lg"
        />
        {/* Bottom Image */}
        <img
          src="https://media.istockphoto.com/id/1339613829/photo/plumber-at-work-in-a-bathroom-plumbing-repair-service-assemble-and-install-concept.jpg?s=612x612&w=0&k=20&c=lQREIzjwRM3ApTkRzTnbIA_BCRCy_ER-e51tofKsaP0="
          alt="Image 2"
          className="object-fill w-80 h-60 rounded-bl-lg  max-[450px]:rounded-lg"
        />
        
        {/* Last Image */}
        <img
          src="https://t3.ftcdn.net/jpg/03/18/50/34/360_F_318503457_FLLfdUmw3Mo5KVcaaRc4ovFSjkXW20d7.jpg"
          alt="Image 4"
          className="object-fill  w-80 h-72 rounded-br-lg max-[450px]:h-60 max-sm:mt-[.5px] max-md:mt-[-9px] mt-[-48px]  max-[450px]:rounded-lg"
        />
        </div>
      </div>
    
    </>
  )
}

export default HeroSectionRight