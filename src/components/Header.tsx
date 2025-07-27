"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

interface HeaderProps {
  currentLang: "en" | "bn"
}

interface MenuItem {
  label: { en: string; bn: string }
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: { en: string; bn: string }; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    label: { en: "Courses", bn: "কোর্স" },
    href: "/courses",
    hasDropdown: true,
    dropdownItems: [
      { label: { en: "IELTS", bn: "আইইএলটিএস" }, href: "/courses/ielts" },
      {
        label: { en: "Programming", bn: "প্রোগ্রামিং" },
        href: "/courses/programming",
      },
    ],
  },
  {
    label: { en: "Admission", bn: "ভর্তি" },
    href: "/admission",
    hasDropdown: true,
    dropdownItems: [
      {
        label: { en: "University", bn: "বিশ্ববিদ্যালয়" },
        href: "/admission/university",
      },
      { label: { en: "Medical", bn: "মেডিকেল" }, href: "/admission/medical" },
    ],
  },
  {
    label: { en: "Jobs", bn: "চাকরি" },
    href: "/jobs",
  },
]

export default function Header({ currentLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "bn" : "en"
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", newLang)
    router.push(`?${params.toString()}`)
  }

  const handleLogoClick = () => {
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const texts = {
    search: { en: "Search courses...", bn: "কোর্স খুঁজুন..." },
    login: { en: "Log In", bn: "লগ ইন" },
    menu: { en: "Menu", bn: "মেনু" },
    hotline: "16910",
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between h-16 gap-2 md:gap-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700 hover:text-green-600"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="cursor-pointer flex-shrink-0" onClick={handleLogoClick}>
                <Image
                  src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                  alt="10 Minute School"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={texts.search[currentLang]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </form>

            {/* Menu Items */}
            <nav className="hidden md:flex items-center space-x-3">
              {menuItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium text-sm"
                  >
                    {item.label[currentLang]}
                    {item.hasDropdown && <ChevronDown size={16} className="text-gray-500" />}
                  </a>

                  {item.hasDropdown && activeDropdown === item.href && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 text-sm"
                        >
                          {dropdownItem.label[currentLang]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right-side buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleLanguage}
                className="hidden md:flex px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {currentLang === "en" ? "বাংলা" : "English"}
              </button>

              <div className="hidden md:flex items-center gap-2 text-green-600 font-semibold text-sm">
                <Phone size={16} />
                <span>{texts.hotline}</span>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                {texts.login[currentLang]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={texts.search[currentLang]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </form>

            {/* Mobile Lang & Hotline */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                {currentLang === "en" ? "বাংলা" : "English"}
              </button>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                <Phone size={16} />
                <span>{texts.hotline}</span>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-3 py-3 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.label[currentLang]}</span>
                    {item.hasDropdown && <ChevronDown size={16} />}
                  </a>
                  {item.hasDropdown && (
                    <div className="ml-4 pl-2 border-l-2 border-gray-100 space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {dropdownItem.label[currentLang]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
