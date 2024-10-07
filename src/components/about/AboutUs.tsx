import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="  border">
      <section className=" py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <h1 className="text-4xl font-bold text-center text-green-500 mb-8">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                alt="Gardening Community"
                className="rounded-lg shadow-lg"
                height={1000}
                src="https://i.ibb.co/kqFvCWJ/Black-White-Minimalist-Logo-removebg-preview.png"
                width={1000}
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-lg mb-6">
                Welcome to the Gardening Social Network, a place where plant
                enthusiasts from all around the world can connect, share, and
                grow together. Whether youre a seasoned gardener or just getting
                started, our platform is designed to help you learn, share tips,
                and build a thriving community.
              </p>
              <p className="text-lg mb-6">
                Our mission is simple: to inspire people to cultivate their own
                green spaces, no matter how big or small. From flower beds to
                urban gardens, we believe that everyone has the ability to
                create beauty through gardening.
              </p>
              <p className="text-lg">
                Join us in this journey to make the world a greener, more
                beautiful place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 ">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-semibold text-center text-green-500 mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <div className=" p-6 rounded-lg shadow-lg text-center border">
              <h3 className="text-2xl font-semibold mb-4">Sustainability</h3>
              <p className="text-lg">
                Sustainability is at the core of everything we do. We encourage
                eco-friendly gardening practices for a healthier planet.
              </p>
            </div>
            <div className=" p-6 rounded-lg shadow-lg text-center border">
              <h3 className="text-2xl font-semibold mb-4">Growth</h3>
              <p className="text-lg">
                Gardening is a journey of growth, both for plants and people.
                Were here to help you along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 ">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold text-green-500 mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg mb-6">
            Our team is passionate about gardening and dedicated to building a
            platform that helps you succeed in your gardening journey.
          </p>
          <div className="flex justify-center space-x-6">
            {/* Example team member */}
            <div className="text-center">
              <Image
                alt="Team Member"
                className="rounded-full mx-auto"
                height={150}
                src="https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/449256923_1647670442699966_40383884863262577_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGwGwXKNRG3WGaPKi91KizNcHiMBtGhQnVweIwG0aFCdX6_QdtD-czt7xIiIpKG0_h3PVOB8OFe9ktplpWl2Q8y&_nc_ohc=K04XejdbJykQ7kNvgExeZq3&_nc_ht=scontent.fdac134-1.fna&_nc_gid=AnPqogWvqs130wt7u5dw5QV&oh=00_AYAUsj8H8QcW7NdmRYQSxsq2nuNXme5lIfdDuIS9YMJ2GQ&oe=6705B26E"
                width={150}
              />
              <h3 className="text-xl font-semibold mt-4">Suhanur Rohoman</h3>
              <p className="text-green-500">Founder & Head Gardener</p>
            </div>
            <div className="text-center">
              <Image
                alt="Team Member"
                className="rounded-full mx-auto"
                height={150}
                src="https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/385089168_1493369571463388_4406300329570507922_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEaMiN-Y8n6gW2oWKjEeATY9yp5ccp_RML3Knlxyn9EwnxX1EOGBpdTE7Kbk89Sl3yaPyYIWpAgoqB8FFe_xN9Z&_nc_ohc=Vo5nSz4FWhwQ7kNvgGA5t-E&_nc_ht=scontent.fdac134-1.fna&_nc_gid=AKNySnSkzQuw1l1A09FaUub&oh=00_AYDMjPI_rCMdxZT-_Q-Xu-BjvGwm3-YHPZTnKl5V4--AWg&oe=6705B200"
                width={150}
              />
              <h3 className="text-xl font-semibold mt-11">Sumon</h3>
              <p className="text-green-500">Community Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
