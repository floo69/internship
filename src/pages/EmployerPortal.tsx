import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, Users, FileText } from 'lucide-react';

const employerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type EmployerFormData = z.infer<typeof employerSchema>;

const EmployerPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
  });

  const onSubmit = (data: EmployerFormData) => {
    console.log(data);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employer Portal</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Post a New Internship</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Internship Title</label>
                <input type="text" id="title" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea id="description" rows={4} className="w-full px-3 py-2 border rounded-md"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block mb-2">Duration</label>
                <input type="text" id="duration" className="w-full px-3 py-2 border rounded-md" placeholder="e.g., 3 months" />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block mb-2">Location</label>
                <input type="text" id="location" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="requirements" className="block mb-2">Requirements</label>
                <textarea id="requirements" rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
                Post Internship
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>
            <div className="space-y-2">
              <p><strong>Company:</strong> TechCorp Inc.</p>
              <p><strong>Industry:</strong> Information Technology</p>
              <p><strong>Location:</strong> Mumbai, Maharashtra</p>
              <p><strong>Website:</strong> www.techcorp.com</p>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
              Edit Profile
            </button></div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Briefcase size={24} className="mr-2 text-green-600" />
                <div>
                  <p className="font-semibold">Active Internships</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users size={24} className="mr-2 text-blue-600" />
                <div>
                  <p className="font-semibold">Total Applicants</p>
                  <p className="text-2xl font-bold">27</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText size={24} className="mr-2 text-purple-600" />
                <div>
                  <p className="font-semibold">Pending Reviews</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Active Internships</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Applicants</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Software Engineering Intern</td>
                <td className="py-2">3 months</td>
                <td className="py-2">15</td>
                <td className="py-2"><span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-sm">Active</span></td>
                <td className="py-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-2 text-red-600 hover:text-red-800">Close</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Data Science Intern</td>
                <td className="py-2">6 months</td>
                <td className="py-2">8</td>
                <td className="py-2"><span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-sm">Active</span></td>
                <td className="py-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-2 text-red-600 hover:text-red-800">Close</button>
                </td>
              </tr>
              <tr>
                <td className="py-2">UI/UX Design Intern</td>
                <td className="py-2">4 months</td>
                <td className="py-2">4</td>
                <td className="py-2"><span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-sm">Active</span></td>
                <td className="py-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-2 text-red-600 hover:text-red-800">Close</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerPortal;