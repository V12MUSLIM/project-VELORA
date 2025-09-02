import { title } from "../components/primitives.jsx";
import DefaultLayout from "../layouts/default.jsx";
export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
          <p className="mt-4 text-lg text-gray-600">
            Velora is your premium online shopping destination.  
            We bring you the best quality products with luxury style 
            and an unmatched shopping experience.  
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
