import type { ColumnConfig, AugmentedUser } from "@/atom/types";

const renderCompanyName = (companyName: string) => {
  const startsWithC = companyName.toLowerCase().startsWith('c');
  return (
    <span className="flex items-center gap-1">
      {companyName}
      {startsWithC && <span className="text-yellow-500">⭐</span>}
    </span>
  );
};

const renderWebsiteLink = (website: string) => {
  const containsBiz = website.toLowerCase().includes('biz');
  const linkText = containsBiz ? 'Visit Business Site' : website;
  const url = website.startsWith('http') ? website : `https://${website}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {linkText}
    </a>
  );
};

const renderCity = (city: string, population: number) => {
  const isLargeCity = population > 10000;
  
  return isLargeCity ? (
    <span 
      className="font-bold cursor-help"
      title={`Population: ${population.toLocaleString()} (Large City)`}
    >
      {city}
    </span>
  ) : (
    <span title={`Population: ${population.toLocaleString()}`}>
      {city}
    </span>
  );
};

export const tableColumns: ColumnConfig<AugmentedUser>[] = [
  {
    field: 'name',
    label: 'Name',
    render: (user) => user.name,
  },
  {
    field: 'email',
    label: 'Email',
    render: (user) => (
      <a
        href={`mailto:${user.email}`}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {user.email}
      </a>
    ),
  },
  {
    field: 'company',
    label: 'Company Name',
    render: (user) => renderCompanyName(user.company.name),
  },
  {
    field: 'city',
    label: 'City',
    render: (user) => renderCity(user.address.city, user.population),
  },
  {
    field: 'website',
    label: 'Website',
    render: (user) => renderWebsiteLink(user.website),
  },
];